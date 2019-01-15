import React from 'react';
import { Progress } from 'antd';
import { connect } from 'dva';


class OrderFullfilment extends React.Component {

  startFilling = () => {
    if (this.props.fakeProgress < 100) {
      this.props.dispatch({
        type: 'order/increaseFakeProgress',
      });
    }
  };

  componentDidMount() {
    this.props.dispatch({ type: 'order/resetFakeProgress' });
    this.interval = setInterval(this.startFilling.bind(this), 10);
    this.props.dispatch({
      type: 'order/makeOrder',
    });
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    console.log(this.props.fakeProgress);
    return (
      <div
        style={{
          width: 200,
          height: 200,
          margin: '50px auto 10px auto',
          transform: 'translate(36px)',
        }}
      >
        <Progress
          type="circle"
          percent={this.props.fakeProgress}
          active
          status={this.props.resolving ? null : (this.props.orderMadeSuccessfully ? 'success' : 'exception')}
        />
        {this.props.resolving ?
          <h2 style={{ transform: 'translate(-5px, 15px)' }}>
            Making order...
          </h2>
          :
          (this.props.orderMadeSuccessfully ?
            <h2 style={{ transform: 'translate(30px, 15px)' }}>
              Done
            </h2>
            :
            <h2 style={{ transform: 'translate(30px, 15px)' }}>
              Error :(
            </h2>
          )}
      </div>
    );
  };
};

export default connect(({ order }) => order)(OrderFullfilment);
