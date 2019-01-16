import { Avatar, Icon, Spin, Card, Tooltip } from 'antd';
import CardCenteredLayout from '../CardCenteredLayout/CardCenteredLayout';
import React from 'react';
import { MD5 } from 'crypto-js';
import { connect } from 'dva';
import moment from 'moment';

const ClientInfo = ({ dispatch, userDetails, isLoading, locationTabIdx }) => {


  return (
    <CardCenteredLayout
      maxWidth={500}
    >
      <Spin
        style={{ transform: 'translate(-2em, 20vh)' }}
        indicator={<Icon type="loading" style={{ fontSize: '5em' }} spin />}
        spinning={isLoading}
      >
        <Avatar
          style={{
            margin: '20px auto 10px auto',
            display: 'block',
            minWidth: 100,
            maxWidth: 200,
            width: '100%',
            minHeight: 100,
            maxHeight: 200,
            height: '100%',
            border: '2px solid rgba(0,0,0,0.1)',
          }}
          src={`https://www.gravatar.com/avatar/${MD5(userDetails.email)}?d=identicon&s=200`}
          shape={'circle'}
        />
        <Card
          title="Contact"
          style={{
            margin: '20px auto 10px auto',
            width: '100%',
          }}
          extra={<Tooltip title="Not yet implemented"> <a href={"#"}>Edit</a> </Tooltip>}
        >
          <p style={{ marginTop: 10 }}>
            Name:  <span style={{ color: 'black', marginLeft: 4 }}>{userDetails.name + userDetails.surname}</span>
          </p>
          <p style={{ marginTop: 10 }}>
            Email:  <span style={{ color: 'black', marginLeft: 4 }}>{userDetails.email}</span>
          </p>
          <p style={{ marginTop: 10 }}>
            Phone number:  <span style={{ color: 'black', marginLeft: 4 }}>{userDetails.phone_number}</span>
          </p>
          <p style={{ marginTop: 10 }}>
            Registered on:
            <Tooltip title={moment(userDetails.registered_on, "YYYYMMDD").fromNow()}>
              <span style={{ color: 'black', marginLeft: 4 }}>
                {moment(userDetails.registered_on).format('MMMM Do YYYY')}
              </span>
            </Tooltip>
          </p>
        </Card>
        {userDetails.locations !== undefined ?
          <Card
            title="Recent orders' locations"
            style={{
              margin: '20px auto 10px auto',
              width: '100%',
            }}
            tabList={userDetails.locations.map((location, idx) => ({ key: idx.toString(), tab: location.place }))}
            onTabChange={key => dispatch({ type: 'user/changeLocationTab', payload: key })}
          >
            <p style={{ marginTop: 10 }}>
              Place:  <span style={{ color: 'black', marginLeft: 4 }}>{userDetails.locations[locationTabIdx].place}</span>
            </p>
            <p style={{ marginTop: 10 }}>
              Street name:  <span style={{ color: 'black', marginLeft: 4 }}>{userDetails.locations[locationTabIdx].street_name}</span>
            </p>
            <p style={{ marginTop: 10 }}>
              Street number:  <span style={{ color: 'black', marginLeft: 4 }}>{userDetails.locations[locationTabIdx].street_number}</span>
            </p>
            {userDetails.locations[locationTabIdx].flat_number !== undefined ?
              <p style={{ marginTop: 10 }}>
                Street number:  <span style={{ color: 'black', marginLeft: 4 }}>{userDetails.locations[locationTabIdx].flat_number}</span>
              </p>
              :
              null
            }
            <p style={{ marginTop: 10 }}>
              Zip code:  <span style={{ color: 'black', marginLeft: 4 }}>{userDetails.locations[locationTabIdx].zip_code}</span>
            </p>
          </Card>
          :
          null
        }
      </Spin>
    </CardCenteredLayout>
  );
};

export default connect(({ user }) => user)(ClientInfo);
