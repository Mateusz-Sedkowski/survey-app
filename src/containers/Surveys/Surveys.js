import React from 'react'
import Survey from './Survey/Survey'
import { MDBDataTable } from 'mdbreact';

const surveys = (props) => {
    const changeEpochToTime = (epoch) => {
        if(epoch) {
            return new Date(epoch * 1000).toLocaleString()
        } else {
            return '-'
        }
    }

    const rows = props.surveys.map((survey) => {
       return {
            icon: survey.Icon ? <img src={survey.Icon} width={40} height={40} /> : '',
            name: survey.Name,
            description: survey.Description,
            questionsCount: survey.Questions ? survey.Questions.length : 0,
            created: changeEpochToTime(survey.Created)
        }
    })

    const data = {
        columns: [
            {
                label: '',
                field: 'icon',
                sort: 'asc',
                width: 60
            },
            {
                label: 'Name',
                field: 'name',
                sort: 'asc',
                width: 250
            },
            {
                label: 'Description',
                field: 'description',
                sort: 'asc',
                width: 250
            },
            {
                label: 'Questions count',
                field: 'questionsCount',
                sort: 'asc',
                width: 60
            },
            {
                label: 'Created at',
                field: 'created',
                sort: 'asc',
                width: 100
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
        // <div className={cssClasses.Surveys}>
        //     <table>
        //         <thead>
        //         <tr>
        //             <th></th>
        //             <th>Name</th>
        //             <th>Description</th>
        //             <th>Questions count</th>
        //             <th>Created at</th>
        //         </tr>
        //         </thead>
        //         <tbody>
        //     {props.surveys.map((survey) => {
        //         return (
        //             <Survey
        //                 key={survey.Poll_UUID}
        //                 icon={survey.Icon}
        //                 name={survey.Name}
        //                 description={survey.Description}
        //                 created={survey.Created}
        //                 questions={survey.Questions}
        //             />
        //         )
        //     })}
        //         </tbody>
        //     </table>
        // </div>
    )
}

export default surveys
