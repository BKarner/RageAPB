import React from 'react';
import { useGlobal } from 'reactn';
import styled from 'styled-components';
import {vh, vw} from '../../utils/common';
import {VehicleSettings} from '@shared/constants/vehicles';

interface RowProps {
    color: string;
}

const Container = styled.div`
  position: absolute;
  top: 25%;
  right: 60%
`;

function getBaseAssetUrl(type: string) {
    return `package://assets/vexamine/${type}/${type}`;
}

type VehicleExaminePageProperties = VehicleSettings;

export function VEHICLE_EXAMINE(props: VehicleExaminePageProperties) {
    return (
        <Container>
            <h3>{props.name}</h3>
            <img alt='vehicle base image' src={getBaseAssetUrl(props.type) + '_base.png'} />
        </Container>
    );
}
