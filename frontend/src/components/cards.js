import React from 'react'
import COLORS from '../constants/theme'
import {
    Card,
    CardBody,
    CardTitle,
    CardText
} from 'reactstrap'

const Cards = ({ title, score, description }) => {
    return (

        <Card
            style={{
                width: '18rem',
                height: '20rem',
                backgroundColor: COLORS.LIGHTBLUE,
                border: 'none',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',

            }}
        >
            <CardBody style={{
                display: 'flex',
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column"
            }}>
                <CardTitle tag="h5" style={{paddingBottom: 30}}>
                    {title}
                </CardTitle>
                <CardText>
                    <p>
                        {score}
                    </p>
                    <p>
                        {description}
                    </p>
                </CardText>
            </CardBody>
        </Card>

    )
}
export default Cards