import React from 'react';
import { Progress } from 'antd';
import { connect } from 'dva';


class OrderFullfilment extends React.Component {

  startFilling = () => {
    if (this.props.fakeProgress < 100) {
      this.props.dispatch({
        type: 'order/increaseFakeProgress'
      });
    }
  };

  componentDidMount() {
    this.props.dispatch({ type: 'order/resetFakeProgress' });
    this.interval = setInterval(this.startFilling.bind(this), 10);
    this.props.dispatch({
      type: 'order/makeOrder',
    })
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div>
        {this.props.resolving ?
          <div
            style={{
              width: 200,
              height: 200,
              margin: '10vh auto 5vh auto',
              transform: 'translate(5vw)'
            }}
          >
            <Progress
              type="circle"
              percent={this.props.fakeProgress}
              active
            />
            {this.props.fakeProgress < 100 ?
            <h2 style={{ transform: 'translate(-0.2vw, 1.5vh)' }}>
              Making order...
            </h2>
              :
            <h2 style={{ transform: 'translate(3.3vw, 1.5vh)' }}>
              Done
            </h2> }
          </div>
          :
          <div>{this.props.orderMadeSuccessfully === false ? <h1>no</h1> : <h1>yes</h1>}</div>
        }
      </div>
    );
  };
};

export default connect(({ order }) => order)(OrderFullfilment);
