import { Button } from '@mui/material';
import React, { useState } from 'react';

import CommonField from '@/components/Field/CommonField.component';
import { setNotification } from '@/redux/slices/global';
import { dispatch } from '@/redux/store';
import { changePassword } from '@/utils/api/restful/profile';
import { strongRegex } from '@/utils/RegExpConfig';

const ChangePass = () => {
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  const handleChangePass = () => {
    if (currentPass === '') {
      dispatch(
        setNotification({
          notiType: 'warning',
          notification: "Current Password can't be empty.",
        })
      );
      return;
    }
    if (newPass === '') {
      dispatch(
        setNotification({
          notiType: 'warning',
          notification: "New Password can't be empty.",
        })
      );
      return;
    }
    if (newPass.length < 8) {
      dispatch(
        setNotification({
          notiType: 'warning',
          notification: 'Password should be atleast 8 characters.',
        })
      );
      return;
    }
    if (!strongRegex.test(newPass)) {
      dispatch(
        setNotification({
          notiType: 'warning',
          notification:
            'Password should conatins Upper, lower, number, special characters.',
        })
      );
      return;
    }
    if (newPass !== confirmPass) {
      dispatch(
        setNotification({
          notiType: 'warning',
          notification: 'Please confirm Password.',
        })
      );
      return;
    }

    changePassword(currentPass, newPass)
      .then((resData) => {
        if (resData.success) {
          dispatch(
            setNotification({
              notiType: 'success',
              notification: resData.message,
            })
          );
        } else {
          dispatch(
            setNotification({
              notiType: 'danger',
              notification: resData.message,
            })
          );
        }
      })
      .catch(() => {
        dispatch(
          setNotification({
            notiType: 'danger',
            notification: 'Please confirm Password.',
          })
        );
      });
  };

  return (
    <div className='flex space-x-12 px-7 py-8'>
      <div className='space-y-4'>
        <div className='flex w-[900px] justify-start space-x-10'>
          <div className='w-1/3 space-y-1'>
            <label className='text-sm font-normal text-sfra-gray-300'>
              Current Password*
            </label>
            <CommonField
              type='password'
              value={currentPass}
              onChange={(value: any) => setCurrentPass(value)}
            />
          </div>
          <div className='w-1/3 space-y-1'>
            <label className='text-sm font-normal text-sfra-gray-300'>
              New Password*
            </label>
            <CommonField
              type='password'
              value={newPass}
              onChange={(value: any) => setNewPass(value)}
            />
          </div>
          <div className='w-1/3 space-y-1'>
            <label className='text-sm font-normal text-sfra-gray-300'>
              Confirm Password*
            </label>
            <CommonField
              type='password'
              value={confirmPass}
              onChange={(value: any) => setConfirmPass(value)}
            />
          </div>
        </div>
        <hr />
        <div className='flex justify-center pt-1'>
          <Button
            className='w-48 !bg-sfra-blue-100 !px-5 !font-montserrat !text-ms !font-normal !normal-case !text-white'
            onClick={() => {
              handleChangePass();
            }}
          >
            Change Password
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChangePass;
