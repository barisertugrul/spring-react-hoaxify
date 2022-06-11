import React, { useState } from 'react';
import ProfileImageWithDefault from './ProfileImageWithDefault'
import { Link } from 'react-router-dom';
import { format } from 'timeago.js';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { deleteHoax } from '../api/apiCalls';
import Modal from './Modal';
import { useApiProgress } from '../shared/ApiProgress'

const HoaxView = (props) => {
    const loggedInUser = useSelector(store => store.username)
    const { hoax, onDeleteHoax } = props
    const { user, content, timeStamp, fileAttachment, id } = hoax
    const { username, displayName, image } = user
    const [ modalVisible, setModalVisible] = useState(false)

    const pendingApiCall = useApiProgress('delete', `/api/1.0/hoaxes/${id}`, true)

    const { t, i18n } = useTranslation()

    const onClickDelete = async () => {
        await deleteHoax(id)
        onDeleteHoax(id)
    }

    const onClickCancel = () => {
        setModalVisible(false)
    }


    const formatted = format(timeStamp, i18n.language)
    const ownedByLoggedInUser = loggedInUser === username

    return (
        <>
            <div className='card p-1'>
                <div className='d-flex m-1'>
                    <ProfileImageWithDefault
                        className="rounded-circle"
                        image={image}
                        width="32"
                        height="32"
                    />
                    <div className='flex-fill m-auto ps-2'>
                        <Link to={`/user/${username}`} className='text-dark'>
                            <h6 className='d-inline'>
                                {displayName}@{username}
                            </h6>
                            <span>-</span>
                            <span>{formatted}</span>
                        </Link>
                    </div>
                    {ownedByLoggedInUser && <button className='btn btn-delete-link btn-sm' onClick={() => setModalVisible(true)}>
                        <i className="material-icons">delete_outline</i>
                    </button>}
                </div>
                <div className='ps-5'>
                    {content}
                </div>
                {fileAttachment &&
                    <div className='ps-5'>
                        {fileAttachment.fileType.startsWith('image') && (
                            <img className='img-fluid' src={'images/attachments/' + fileAttachment.name} alt={content} />
                        )}
                        {!fileAttachment.fileType.startsWith('image') && (
                            <strong>Hoax has unkown attachment</strong>
                        )}
                    </div>
                }
            </div>
            <Modal
                visible={modalVisible}
                onClickCancel={onClickCancel}
                onClickComfirm={onClickDelete}
                message={
                    <div>
                        <div>
                            <strong>{t('Are you sure to delete this hoax?')}</strong>
                        </div>
                        <span>{content}</span>
                    </div>
                }
                pendingApiCall={pendingApiCall}
                title={t('Delete Hoax')}
                comfirmBtnText={t('Delete Hoax')}
            />
        </>
    );
};

export default HoaxView;