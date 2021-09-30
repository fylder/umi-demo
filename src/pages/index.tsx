import { Button, Layout, Menu } from 'antd';
import Text from 'antd/lib/typography/Text';
import { connect, useDispatch, useStore } from 'dva';
import React, { useMemo, useState } from 'react';
import { initialState, StateType } from '../models/book';
const { Header, Content, Footer } = Layout;

function IndexPage(props: { book: any }) {
  const dispatch = useDispatch();
  const store = useStore();

  const [bookState, setBookState] = useState<StateType>(initialState);

  // 监听Redux
  useMemo(() => {
    console.log('props状态改变触发器');
    let storeState = store.getState();
    setBookState(storeState.book);
  }, [props]);

  function updateBookState() {
    console.log('book:', props.book);
  }

  function handlerQuery(id: string) {
    dispatch({
      type: 'book/query',
      payload: { id },
    });
  }

  return (
    <div>
      <Layout className="layout">
        <Header>
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
            {new Array(4).fill(null).map((_, index) => {
              const key = index + 1;
              return <Menu.Item key={key}>{`nav ${key}`}</Menu.Item>;
            })}
          </Menu>
        </Header>
        <Content>
          <Button
            type="primary"
            onClick={() => {
              handlerQuery('ahhhh');
            }}
          >
            click
          </Button>
          <div>
            <Text>book: {props.book.info}</Text>
          </div>
          <div>
            <Text>useState book: {bookState.info}</Text>
          </div>
        </Content>
      </Layout>
    </div>
  );
}

export default connect(({ book }: { book: StateType }) => ({ book }))(
  IndexPage,
);
