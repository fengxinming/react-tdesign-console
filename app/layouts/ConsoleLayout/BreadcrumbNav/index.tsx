import { isValidElement } from 'react';
import { Breadcrumb } from 'tdesign-react';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useLayoutStore } from '~/store';

function BreadcrumbNav() {
  const { t } = useTranslation();
  const menuTrail = useLayoutStore((s) => s.menuTrail);
  const icon = menuTrail[0]?.icon;

  // TDesign Breadcrumb 用 options 数据驱动；首项仍是「图标」面包屑，分隔符交给 TDesign 默认渲染。
  const options = [
    ...(isValidElement(icon) ? [{ icon }] : []),
    ...menuTrail.map(({ name }) => ({ content: t(name) || name })),
  ];

  return (
    <div className="py-[8px]">
      <Breadcrumb options={options} />
    </div>
  );
}

export default memo(BreadcrumbNav);
