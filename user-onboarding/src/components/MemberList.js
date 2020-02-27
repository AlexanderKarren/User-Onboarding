import React from 'react';
import './MemberList.css';

const MemberList = props => {
    return (
        <div className="member-list-container">
            <h2>Members</h2>
            {props.members.map(member => {
                return (
                    <div>
                        <h3>{member.name}</h3>
                        <ul>
                            <li>E-mail: {member.email}</li>
                            <li>Password: {member.password}</li>
                            <li>Teacher: {member.teacher}</li>
                        </ul>
                    </div>
                )
            })}
        </div>
    )
}

export default MemberList;