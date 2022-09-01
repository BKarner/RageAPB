import React from 'react';
import { useGlobal } from 'reactn';
import styled from 'styled-components';
import {vh, vw} from '../../utils/common';

interface RowProps {
    color: string;
}

const Container = styled.div`
  position: absolute;
  top: ${vh(15)};
  right: ${vw(20)};
  text-align: right;
  font-family: 'Roboto', sans-serif;
  -webkit-user-select: none;
  color: #0347ff;
`;
const Row = styled.div<RowProps>`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
`;

export function TEST_PAGE() {
    return (
        <Container>
            <Row color="#fff">
                <span>$TEST_STRING</span>
            </Row>
        </Container>
    );
}
