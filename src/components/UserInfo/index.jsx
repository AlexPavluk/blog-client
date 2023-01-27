import { isEmpty } from 'lodash';
import React from 'react';
import styles from './UserInfo.module.scss';
import { Link } from "react-router-dom";

export const UserInfo = ({ _id, avatarUrl, fullName, additionalText }) => {
  const avatar = !isEmpty(avatarUrl) ? `${process.env.REACT_APP_API}${avatarUrl}` : '/noavatar.png';

  return (
    <div className={styles.root}>
        <Link to={`/profile/${_id}`}>
            <img className={styles.avatar} src={avatar} alt={fullName} />
        </Link>
      <div className={styles.userDetails}>
        <span className={styles.userName}>{fullName}</span>
        <span className={styles.additional}>{additionalText}</span>
      </div>
    </div>
  );
};
