import { notification } from 'antd'
import { DESKTOP_HEADER_HEIGHT } from '../constants'

// https://ant.design/components/notification/

notification.config({
  //bottom:
  //closeIcon:
  duration: 10, // in seconds
  //getContainer:
  placement: 'topRight',
  top: DESKTOP_HEADER_HEIGHT
  //rtl: true,
})
