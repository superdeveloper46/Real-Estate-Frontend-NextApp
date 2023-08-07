import { Button, MenuItem, Select, Switch } from '@mui/material';
import React, { useEffect, useState } from 'react';

import CommonField from '@/components/Field/CommonField.component';
import { setGlobalLoading, setNotification } from '@/redux/slices/global';
import { dispatch } from '@/redux/store';
import { changeMyInfo, getMyInfo } from '@/utils/api/restful/profile';

const MyInfo = () => {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone1, setPhone1] = useState('');
  const [phone2, setPhone2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [timeZone, setTimeZone] = useState('Pacific');

  const [avatar, setAvatar] = useState('/assets/images/settings/avatar.svg');

  const options = [
    'Eastern',
    'Central',
    'Mountain',
    'Arizona',
    'Pacific',
    'Alaska',
    'Hawaii',
  ];

  const handleUploadImage = (event: any): void => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (e: any) => {
      const result = e.target?.result;
      const base64String = btoa(result);
      const blobString = 'data:image/png;base64,' + base64String;
      setAvatar(blobString);
    });

    reader.readAsBinaryString(file);
  };

  const handleUpdateMyInfo = () => {
    if (email === '') {
      dispatch(
        setNotification({
          notiType: 'warning',
          notification: "Email address can't be empty.",
        })
      );
      return;
    }
    if (fullName === '') {
      dispatch(
        setNotification({
          notiType: 'warning',
          notification: "Full Name can't be empty.",
        })
      );
      return;
    }

    changeMyInfo(
      email,
      fullName,
      phone1,
      phone2,
      city,
      state,
      zipCode,
      timeZone,
      avatar
    )
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
            notification: 'Server Error',
          })
        );
      });
  };

  useEffect(() => {
    dispatch(setGlobalLoading(true));
    getMyInfo()
      .then((resData) => {
        dispatch(setGlobalLoading(false));
        setEmail(resData.email);
        setFullName(resData.fullName);
        setPhone1(resData.phone1);
        setPhone2(resData.phone2);
        setCity(resData.city);
        setState(resData.state);
        setZipCode(resData.zipCode);
        setTimeZone(resData.timeZone);
        setAvatar(resData.picture);
      })
      .catch(() => {
        dispatch(setGlobalLoading(false));
      });
  }, []);

  return (
    <div className='flex space-x-12 px-4 py-8'>
      <div className='w-52 space-y-4'>
        <div className='flex items-center justify-center'>
          <img
            src={avatar}
            className='h-32 w-32 rounded-full border'
            alt='user avatar'
          />
        </div>
        <div className='flex items-center justify-center'>
          <Button
            component='label'
            className='w-36 !bg-sfra-blue-100 !px-5 !font-montserrat !text-ms !font-normal !normal-case !text-white'
          >
            Select Image
            <input
              type='file'
              accept='image/*'
              onChange={(event: any) => handleUploadImage(event)}
              hidden
            />
          </Button>
        </div>
      </div>
      <div className='space-y-4'>
        <div className='flex w-[600px] justify-start space-x-10'>
          <div className='w-1/2 space-y-1'>
            <label className='text-sm font-normal text-sfra-gray-300'>
              Email address
            </label>
            <CommonField
              type='text'
              value={email}
              onChange={(value: any) => setEmail(value)}
            />
          </div>
          <div className='w-1/2 space-y-1'>
            <label className='text-sm font-normal text-sfra-gray-300'>
              Full Name
            </label>
            <CommonField
              type='text'
              value={fullName}
              onChange={(value: any) => setFullName(value)}
            />
          </div>
        </div>
        <div className='flex w-[600px] justify-start space-x-10'>
          <div className='w-1/2 space-y-1'>
            <label className='text-sm font-normal text-sfra-gray-300'>
              Phone1
            </label>
            <CommonField
              type='text'
              value={phone1}
              onChange={(value: any) => setPhone1(value)}
            />
          </div>
          <div className='w-1/2 space-y-1'>
            <label className='text-sm font-normal text-sfra-gray-300'>
              Phone2
            </label>
            <CommonField
              type='text'
              value={phone2}
              onChange={(value: any) => setPhone2(value)}
            />
          </div>
        </div>
        <hr className='!my-6' />
        <div className='flex w-[900px] justify-start space-x-10'>
          <div className='w-1/2 space-y-1'>
            <label className='text-sm font-normal text-sfra-gray-300'>
              City
            </label>
            <CommonField
              type='text'
              value={city}
              onChange={(value: any) => setCity(value)}
            />
          </div>
          <div className='w-1/2 space-y-1'>
            <label className='text-sm font-normal text-sfra-gray-300'>
              State
            </label>
            <CommonField
              type='text'
              value={state}
              onChange={(value: any) => setState(value)}
            />
          </div>
          <div className='w-1/2 space-y-1'>
            <label className='text-sm font-normal text-sfra-gray-300'>
              ZipCode
            </label>
            <CommonField
              type='text'
              value={zipCode}
              onChange={(value: any) => setZipCode(value)}
            />
          </div>
        </div>
        <div className='flex w-[600px] justify-start space-x-10'>
          <div className='w-1/2 space-y-1'>
            <label className='text-sm font-normal text-sfra-gray-300'>
              TimeZone
            </label>
            <Select
              value={timeZone}
              className='h-10 w-full'
              onChange={(event: any) => {
                setTimeZone(event.target.value);
              }}
            >
              {options.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </div>
          <div className='w-1/2 space-y-1'>
            <label className='text-sm font-normal text-sfra-gray-300'>
              Dark Mode
            </label>
            <div>
              <Switch />
            </div>
          </div>
        </div>
        <hr className='!my-6' />
        <div className='flex justify-center pt-3'>
          <Button
            className='w-36 !bg-sfra-blue-100 !px-5 !font-montserrat !text-ms !font-normal !normal-case !text-white'
            onClick={() => {
              handleUpdateMyInfo();
            }}
          >
            Update
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MyInfo;
