import { Button, Layout, Menu } from 'antd';
import Text from 'antd/lib/typography/Text';
import { connect, useDispatch, useStore } from 'dva';
import React, { useMemo, useState } from 'react';
import { useModel } from 'umi';
import { initialState, StateType } from '../models/book';
const { Header, Content, Footer } = Layout;

//声明props，用于可调用props.login
function IndexPage(props: { book: any; login: any }) {
  const dispatch = useDispatch();
  const store = useStore();
  const { user, setUserData } = useModel('appstore');

  const [bookState, setBookState] = useState<StateType>(initialState);

  // 监听Redux
  useMemo(() => {
    console.log('props book状态');
    let storeState = store.getState();
    setBookState(storeState.book);
    console.log('props:', storeState.book);
  }, [props.book]);

  // 监听Redux
  useMemo(() => {
    console.log('props login状态');
    console.log('login info:', props.login);
  }, [props.login]);

  function updateBookState() {
    console.log('book:', props.book);
  }

  function handlerQuery(id: string) {
    console.log('model', user);
    setUserData('liang', '123');
    dispatch({
      type: 'book/query',
      payload: { id },
    });
  }

  function handlerLogin() {
    let data = {
      username: 'fylder',
      password: '1234567',
    };
    dispatch({
      type: 'login/loginAhh',
      payload: data,
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
          <Button
            type="default"
            onClick={() => {
              handlerLogin();
            }}
          >
            login
          </Button>
          <div>
            <Text>book: {props.book.info}</Text>
          </div>
          <div>
            <Text>useState book: {bookState.info}</Text>
          </div>
          <div>
            <Text>
              bookModel account: {user.account}, password:{user.password}
            </Text>
          </div>
        </Content>
      </Layout>
    </div>
  );
}

export default connect(({ book, login }: { book: StateType; login: any }) => ({
  book,
  login,
}))(IndexPage);
