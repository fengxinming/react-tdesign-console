import { Button, Col, DateRangePicker, Form, Input, Row, Select, Space } from 'tdesign-react';
import { RefreshIcon, SearchIcon } from 'tdesign-icons-react';
import { useTranslation } from 'react-i18next';
import { ContentType, FilterType, Status } from './constants';
import styles from './style.module.styl';
import type { SearchFormProps } from './types';

export default function SearchForm({ onSearch }: SearchFormProps) {
  const { t, i18n } = useTranslation();
  const [form] = Form.useForm();

  const colSpan = i18n.language === 'zh-CN' ? 4 : 6;

  const handleSubmit = () => {
    onSearch(form.getFieldsValue(true));
  };

  const handleReset = () => {
    form.reset();
    onSearch({});
  };

  return (
    <div className={styles['search-form-wrapper']}>
      <Form form={form} className={styles['search-form']} labelAlign="left" labelWidth={80}>
        <Row gutter={[80, 16]}>
          <Col xs={12} sm={colSpan}>
            <Form.FormItem label={t('searchTable.columns.id')} name="id">
              <Input placeholder={t('searchForm.id.placeholder')} clearable />
            </Form.FormItem>
          </Col>
          <Col xs={12} sm={colSpan}>
            <Form.FormItem label={t('searchTable.columns.name')} name="name">
              <Input placeholder={t('searchForm.name.placeholder')} clearable />
            </Form.FormItem>
          </Col>
          <Col xs={12} sm={colSpan}>
            <Form.FormItem label={t('searchTable.columns.contentType')} name="contentType">
              <Select
                placeholder={t('searchForm.all.placeholder')}
                options={ContentType.map((item, index) => ({ label: item, value: index }))}
                multiple
                clearable
              />
            </Form.FormItem>
          </Col>
          <Col xs={12} sm={colSpan}>
            <Form.FormItem label={t('searchTable.columns.filterType')} name="filterType">
              <Select
                placeholder={t('searchForm.all.placeholder')}
                options={FilterType.map((item, index) => ({ label: item, value: index }))}
                multiple
                clearable
              />
            </Form.FormItem>
          </Col>
          <Col xs={12} sm={colSpan}>
            <Form.FormItem label={t('searchTable.columns.createdTime')} name="createdTime">
              <DateRangePicker className="w-full" clearable />
            </Form.FormItem>
          </Col>
          <Col xs={12} sm={colSpan}>
            <Form.FormItem label={t('searchTable.columns.status')} name="status">
              <Select
                placeholder={t('searchForm.all.placeholder')}
                options={Status.map((item, index) => ({ label: item, value: index }))}
                multiple
                clearable
              />
            </Form.FormItem>
          </Col>
        </Row>
      </Form>
      <div className={styles['right-button']}>
        <Space direction="vertical">
          <Button theme="primary" icon={<SearchIcon />} onClick={handleSubmit}>
            {t('searchTable.form.search')}
          </Button>
          <Button variant="outline" theme="default" icon={<RefreshIcon />} onClick={handleReset}>
            {t('searchTable.form.reset')}
          </Button>
        </Space>
      </div>
    </div>
  );
}
