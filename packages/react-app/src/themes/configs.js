import { notification } from 'antd'
import { HEADER_HEIGHT } from '../constants'

// https://ant.design/components/notification/

notification.config({
  //bottom:
  //closeIcon:
  duration: 10, // in seconds
  //getContainer:
  placement: 'topRight',
  top: HEADER_HEIGHT
  //rtl: true,
})
