import styled from "@emotion/styled";
import {Button as AntButton} from "antd";

export const OrderButton = styled(AntButton)`
  background-color: #26474E;
  box-shadow: rgba(0, 0, 0, 0.12) 0 1px 3px, rgba(0, 0, 0, 0.24) 0 1px 2px;
  color: white;
  &:hover {
    background-color: #478593;
    color: white;
  }
  border: none;
  width: 40%;
  height: 40px;
  border-radius: 3px;
`

export const SaveButton = styled(AntButton)`
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
  width: 40%;
  border-radius: 3px;
  height: 40px;
  border: none;
  &:hover {
    background-color: #daeaed;
    color: black;
  }
`