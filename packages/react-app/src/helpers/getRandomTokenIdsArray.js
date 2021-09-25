import shuffleArray from 'shuffle-array'
import { MAX_TOKEN_ID } from '../constants'

export default function getRandomTokenIdsArray() {
  const tokenList = [...Array(MAX_TOKEN_ID).keys()]
  shuffleArray(tokenList)
  return tokenList
}
