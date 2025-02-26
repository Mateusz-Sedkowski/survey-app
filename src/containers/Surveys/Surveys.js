import React from 'react'
import { MDBDataTable } from 'mdbreact';
import { Link } from "react-router-dom";
import { S3Image } from "aws-amplify-react";
import './Surveys.scss';

const surveys = (props) => {
    const changeEpochToTime = (epoch) => {
        if (epoch) {
            return new Date(epoch * 1000).toLocaleString()
        } else {
            return '-'
        }
    }

    const rows = props.surveys.map((survey) => {
        return {
            icon: survey.Icon ? <S3Image imgKey={survey.Icon} alt="Survey icon" width="40px" height="40px" /> : '',
            name: survey.Name,
            description: survey.Description,
            questionsCount: survey.Questions ? survey.Questions.length : 0,
            created: changeEpochToTime(survey.Created),
            details: <Link to={`/polls/${survey.Poll_UUID}`}>View</Link>
        }
    })

    const data = {
        columns: [
            {
                label: '',
                field: 'icon',
                sort: 'asc',
                width: 60,
                attributes: {
                    'id': 'icon-column'
                }
            },
            {
                label: 'Name',
                field: 'name',
                sort: 'asc',
                width: 300,
                attributes: {
                    'id': 'name-column'
                }
            },
            {
                label: 'Description',
                field: 'description',
                sort: 'asc',
                width: 300,
                attributes: {
                    'id': 'description-column'
                }
            },
            {
                label: 'Number of questions',
                field: 'questionsCount',
                sort: 'asc',
                width: 60,
                attributes: {
                    'id': 'questions-count-column'
                }
            },
            {
                label: 'Created at',
                field: 'created',
                sort: 'asc',
                width: 150,
                attributes: {
                    'id': 'created-at-column'
                }
            },
            {
                label: '',
                field: 'details',
                sort: 'asc',
                width: 80,
                attributes: {
                    'id': 'details-column'
                }
            }
        ],
        rows: rows
    }
    return (
        <MDBDataTable
            className='surveysTable'
            fixed={true}
            striped
            bordered
            hover
            data={data}
        />
    )
}

export default surveys
