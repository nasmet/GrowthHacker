import React, {
  Component,
  useEffect,
  useState,
} from 'react';
import {
  Table,
  Pagination,
  Button,
} from '@alifd/next';
import {
  withRouter,
} from 'react-router-dom';
import IceContainer from '@icedesign/container';
import styles from './index.module.scss';

const getData = () => {
  return [{
    id: 1,
    content: '123',
    word: '123',
    zan: 5,
    forward: 10,
    comment: 12,
    time: '2017-7',
    source: '123',
  }, {
    id: 2,
    content: '456',
    word: '456',
    zan: 6,
    forward: 12,
    comment: 125,
    time: '2018-7',
    source: '123',
  }];
};

const {
  Column,
} = Table;

function WeiboHot() {
  const [curPage, setCurPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [sort, setSort] = useState({});
  let cancelTask = false; // 防止内存泄露

  useEffect(() => {
    function fetchData() {
      setLoading(true);
      setTimeout(() => {
        if (cancelTask) {
          return;
        }
        setCount(1);
        setData(getData());
        setLoading(false);
      }, 1000);
    }

    fetchData();

    return () => {
      cancelTask = true;
    };
  }, [curPage]);

  const pageChange = (e) => {
    setCurPage(e);
  };

  const handle = (e) => {
    console.log(e);
  };

  const renderCover = (value, index, record) => {
    return (
      <Button type="primary" onClick={handle.bind(this, record)}>
        加入监控
      </Button>
    );
  };

  const onSort = (dataIndex, order) => {
    setData((prevData) => {
      return prevData.sort((a, b) => {
        if (dataIndex === 'time') {
          const t1 = utils.dateMap(a[dataIndex]).ms;
          const t2 = utils.dateMap(b[dataIndex]).ms;
          return order === 'asc' ? t1 - t2 : t2 - t1;
        }
        return order === 'asc' ? a[dataIndex] - b[dataIndex] : b[dataIndex] - a[dataIndex];
      });
    });
    setSort({
      [dataIndex]: order,
    });
  };

  return (
    <div>
      <IceContainer>
        <Table loading={loading} dataSource={data} hasBorder={false} onSort={onSort} sort={sort}>
          <Column title="热门内容" dataIndex="content" />
          <Column title="热门词" dataIndex="word" />
          <Column title="点赞" dataIndex="zan" sortable />
          <Column title="转发" dataIndex="forward" sortable />
          <Column title="评论" dataIndex="comment" sortable />
          <Column title="发布时间" dataIndex="time" sortable />
          <Column title="来源" dataIndex="source" />
          <Column title="操作" cell={renderCover} />
        </Table>

        <Pagination
          className={styles.pagination}
          current={curPage}
          total={count}
          onChange={pageChange}
        />
      </IceContainer>
    </div>
  );
}

export default withRouter(WeiboHot);