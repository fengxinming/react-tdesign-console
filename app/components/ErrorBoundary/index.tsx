import './style.styl';
import { useTranslation } from 'react-i18next';
import { isRouteErrorResponse, useNavigate, useRouteError } from 'react-router';
import { Button } from 'tdesign-react';
import AppProviders from '~/components/AppProviders';
import '~/i18n';

// 与 routes/exception 下各异常页保持同一套文案，按错误状态码分派。
const views = {
  '404': { description: 'exception.result.404.description' },
  '403': { description: 'exception.result.403.description' },
  '500': { description: 'exception.result.500.description' },
} as const;

// 业务错误码只作「有则显示」的补充信息：状态码由左侧大号数字独占，
// 取不到 code 时右侧标签整个不渲染。兼容 error.code 与 response.data.code 两种形态。
function readErrorCode(error: unknown): string | undefined {
  if (error == null || typeof error !== 'object') {
    return undefined;
  }
  const source = error as Record<string, unknown>;
  const { data } = source;
  const nested =
    data != null && typeof data === 'object' ? (data as Record<string, unknown>).code : undefined;
  const raw = source.code ?? nested;
  if (typeof raw === 'string' || typeof raw === 'number') {
    return String(raw) || undefined;
  }
  return undefined;
}

export default function ErrorBoundary() {
  const error = useRouteError();
  const navigate = useNavigate();
  const { t } = useTranslation();

  let status = 500;
  let details: string | undefined;
  if (isRouteErrorResponse(error)) {
    status = error.status;
    // 状态码只由左侧大号数字展示，详情里不再重复拼数字。
    details = error.statusText.trim() || undefined;
  } else if (error instanceof Error) {
    details = error.message || undefined;
  } else if (error != null) {
    details = String(error);
  }

  const view: keyof typeof views =
    status === 404 ? '404' : status === 403 || status === 401 ? '403' : '500';
  const errorCode = readErrorCode(error);

  // 调用栈只在开发环境输出，放在限高自滚动的调试面板里，不与详情重复。
  const stack = import.meta.env.DEV && error instanceof Error ? error.stack : undefined;

  return (
    <AppProviders>
      <main className="ep-stage" role="alert">
        <div className="ep-shell">
          <div className="ep-hero">
            <svg className="ep-emblem" viewBox="0 0 240 240" fill="none" aria-hidden="true">
              <circle className="ep-orbit" cx="120" cy="120" r="112" />
              <path
                className="ep-wire-outer"
                d="M120 10 L214 65 L214 175 L120 230 L26 175 L26 65 Z"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
              <path
                className="ep-wire-links"
                d="M120 10 L120 48 M214 65 L186 86 M214 175 L186 154 M120 230 L120 192 M26 175 L54 154 M26 65 L54 86"
                strokeWidth="1.2"
              />
              <path
                className="ep-wire-inner"
                d="M120 48 L186 86 L186 154 L120 192 L54 154 L54 86 Z"
                strokeWidth="1.2"
                strokeLinejoin="round"
              />
              <g className="ep-nodes">
                <circle cx="120" cy="10" r="3" />
                <circle cx="214" cy="65" r="3" />
                <circle cx="214" cy="175" r="3" />
                <circle cx="120" cy="230" r="3" />
                <circle cx="26" cy="175" r="3" />
                <circle cx="26" cy="65" r="3" />
              </g>
              <path
                className="ep-wire-trace"
                d="M120 10 L214 65 L214 175 L120 230 L26 175 L26 65 Z"
                strokeWidth="2"
                strokeLinejoin="round"
                pathLength={100}
              />
            </svg>
            <span className="ep-code">{status}</span>
            <span className="ep-mark-bar" aria-hidden="true" />
            <span className="ep-mark-cross" aria-hidden="true" />
          </div>

          <div className="ep-info">
            {errorCode && <span className="ep-tag">{errorCode}</span>}
            <h1 className="ep-title">{t(views[view].description)}</h1>
            {details && <p className="ep-desc">{details}</p>}
            <div className="ep-actions">
              <Button variant="outline" theme="default" onClick={() => window.location.reload()}>
                {t('exception.result.refresh')}
              </Button>
              <Button theme="primary" onClick={() => navigate('/', { replace: true })}>
                {t('exception.result.backHome')}
              </Button>
            </div>
            {stack && (
              <div className="ep-debug">
                <pre className="ep-stack">
                  <code>{stack}</code>
                </pre>
              </div>
            )}
          </div>
        </div>
      </main>
    </AppProviders>
  );
}
