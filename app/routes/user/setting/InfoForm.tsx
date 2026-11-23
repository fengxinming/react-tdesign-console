import { useEffect } from 'react';
import {
  Button,
  Cascader,
  Form,
  Input,
  MessagePlugin,
  Select,
  Skeleton,
  Space,
  Textarea,
} from 'tdesign-react';
import { useTranslation } from 'react-i18next';
import { useUserStore } from '~/store';
import { useSaveInfo } from '~/hooks/api/useUser';
import type { BasicInfoForm } from './types';

const cascaderOptions = [
  {
    label: '北京市',
    value: 'BeiJing',
    children: [
      {
        label: '北京市',
        value: 'BeiJing',
        children: [
          { label: '海淀区', value: 'HaiDian' },
          { label: '朝阳区', value: 'ChaoYang' },
        ],
      },
    ],
  },
  {
    label: '上海市',
    value: 'ShangHai',
    children: [
      {
        label: '上海市',
        value: 'ShangHai',
        children: [
          { label: '黄浦区', value: 'HuangPu' },
          { label: '静安区', value: 'JingAn' },
        ],
      },
    ],
  },
];

/** 基础信息表单:邮箱/昵称/国家地区/所在地/地址/简介 + 保存/重置。 */
export default function InfoForm() {
  const { t, i18n } = useTranslation();
  const [form] = Form.useForm();

  const user = useUserStore((s) => s.user);
  const loading = !user;
  const { mutateAsync: saveInfo, isPending: saving } = useSaveInfo();

  useEffect(() => {
    if (user) {
      form.setFieldsValue({ email: user.email, nickName: user.name });
    }
  }, [user, form]);

  const handleSave = async () => {
    try {
      const result = await form.validate();
      if (result !== true) {
        return;
      }
      const values = form.getFieldsValue(true) as BasicInfoForm;
      await saveInfo(values);
      void MessagePlugin.success(t('userSetting.saveSuccess'));
    } catch {
      /* 校验未通过,不提交 */
    }
  };

  const handleReset = () => form.reset();

  const lang = i18n.language;

  return (
    <div className="w-[500px] max-w-full mt-[6px]">
      <Form
        form={form}
        labelWidth={lang === 'en-US' ? 100 : 80}
        initialData={{ location: ['BeiJing', 'BeiJing', 'HaiDian'] }}
      >
        {loading ? (
          <Skeleton animation="gradient" rowCol={[1]} />
        ) : (
          <Form.FormItem
            label={t('userSetting.info.email')}
            name="email"
            rules={[
              {
                required: true,
                email: true,
                message: t('userSetting.info.email.placeholder'),
              },
            ]}
          >
            <Input placeholder={t('userSetting.info.email.placeholder')} />
          </Form.FormItem>
        )}
        {loading ? (
          <Skeleton animation="gradient" rowCol={[1]} />
        ) : (
          <Form.FormItem
            label={t('userSetting.info.nickName')}
            name="nickName"
            rules={[{ required: true, message: t('userSetting.info.nickName.placeholder') }]}
          >
            <Input placeholder={t('userSetting.info.nickName.placeholder')} />
          </Form.FormItem>
        )}
        {loading ? (
          <Skeleton animation="gradient" rowCol={[1]} />
        ) : (
          <Form.FormItem
            label={t('userSetting.info.area')}
            name="rangeArea"
            rules={[{ required: true, message: t('userSetting.info.area.placeholder') }]}
          >
            <Select
              options={[{ label: '中国', value: '中国' }]}
              placeholder={t('userSetting.info.area.placeholder')}
            />
          </Form.FormItem>
        )}
        {loading ? (
          <Skeleton animation="gradient" rowCol={[1]} />
        ) : (
          <Form.FormItem
            label={t('userSetting.info.location')}
            name="location"
            rules={[{ required: true }]}
          >
            <Cascader options={cascaderOptions} />
          </Form.FormItem>
        )}
        {loading ? (
          <Skeleton animation="gradient" rowCol={[1]} />
        ) : (
          <Form.FormItem label={t('userSetting.info.address')} name="address">
            <Input placeholder={t('userSetting.info.address.placeholder')} />
          </Form.FormItem>
        )}
        {loading ? (
          <Skeleton animation="gradient" rowCol={[1, 1, 1]} />
        ) : (
          <Form.FormItem label={t('userSetting.info.profile')} name="profile">
            <Textarea placeholder={t('userSetting.info.profile.placeholder')} />
          </Form.FormItem>
        )}
        <div style={{ marginLeft: lang === 'en-US' ? 100 : 80 }} className="mt-[8px]">
          <Space>
            <Button theme="primary" loading={saving} onClick={handleSave}>
              {t('userSetting.save')}
            </Button>
            <Button theme="default" variant="outline" onClick={handleReset}>
              {t('userSetting.reset')}
            </Button>
          </Space>
        </div>
      </Form>
    </div>
  );
}
