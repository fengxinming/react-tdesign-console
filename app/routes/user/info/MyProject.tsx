import { Avatar, Card, Col, Row, Skeleton, Typography } from 'tdesign-react';
import { useProjectsQuery } from '~/hooks/api/useUser';
import type { ProjectItem } from '~/api/types';
import type { ProjectCardProps } from './types';
import styles from './style.module.styl';

function ProjectCard(props: ProjectCardProps) {
  const { loading, contributors, title, enTitle, contributorsLength } = props;

  return (
    <Card className={styles['project-wrapper']}>
      <Skeleton loading={loading} animation="gradient" rowCol={[1]}>
        <Typography.Title level="h5">{title}</Typography.Title>
      </Skeleton>

      <Skeleton loading={loading} animation="gradient" rowCol={[1]}>
        <Typography.Text ellipsis={{ expandable: false }} className="!m-0">
          {enTitle}
        </Typography.Text>
      </Skeleton>

      <div className="mt-[22px]">
        <Skeleton loading={loading} animation="gradient" rowCol={[1]}>
          <Avatar.Group size="small">
            {(contributors ?? []).map((item) => (
              <Avatar key={item.avatar} image={item.avatar} />
            ))}
          </Avatar.Group>
          <Typography.Text theme="secondary">
            等{(contributorsLength ?? 0).toLocaleString()}人
          </Typography.Text>
        </Skeleton>
      </div>
    </Card>
  );
}

export default function MyProject() {
  const { data = [], isLoading: loading } = useProjectsQuery();
  const list = data.length ? data : Array.from({ length: 6 }, () => ({}));

  return (
    <Row gutter={12}>
      {list.map((item: ProjectItem, index) => (
        <Col
          key={item.title || index}
          xs={12} sm={6} md={4}
          className={index > list.length - 4 && index < list.length ? 'mt-[16px]' : undefined}
        >
          <ProjectCard {...item} loading={loading} />
        </Col>
      ))}
    </Row>
  );
}
