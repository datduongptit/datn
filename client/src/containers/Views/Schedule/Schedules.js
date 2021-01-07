import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import {
    CCard,
    CCardBody,
    CCol,
    CDataTable,
    CRow,
    CButton,
    CBadge
} from '@coreui/react'
import { useDispatch, useSelector } from 'react-redux';
import { getSchedules } from '../../../redux/actions/schedule';
import Spinner from '../../../components/LoadingIndicator/Spinner';
import Alert from '../../../components/Alert/Alerts';
import Modal from '../../../components/Modal/Modal'

const Schedules = () => {
    const history = useHistory()
    const dispatch = useDispatch();
    const scheduleList = useSelector(state => state.scheduleList);
    const { loading, error, data } = scheduleList

    const fields = [
        { key: 'title', _style: { width: '20%' } },
        { key: 'description', _style: { width: '10%' } },
        { key: 'status', _style: { width: '10%' } },
        { key: 'dateAndTime', _style: { width: '10%' } },
        { key: 'endDateAndTime', _style: { width: '10%' } },
        { key: 'createdAt', _style: { width: '10%' } },
        { key: 'user', _style: { width: '10%' } },
        {
            key: 'detail',
            label: '',
            _style: { width: '1%' },
            sorter: false,
            filter: false
        },
        {
            key: 'edit',
            label: '',
            _style: { width: '1%' },
            sorter: false,
            filter: false
        },
        {
            key: 'delete',
            label: '',
            _style: { width: '1%' },
            sorter: false,
            filter: false
        }
    ]
    const getBadge = (status) => {
        switch (status) {
            case 'on': return 'success'
            case 'off': return 'danger'
            default: return 'primary'
        }
    }
    useEffect(() => {
        dispatch(getSchedules());
    }, [dispatch]);

    return (
        <>
            {loading ? (
                <Spinner />
            ) : error ? (
                <Alert color="danger" msg={error.message} />
            ) : (
                        <CRow>
                            <CCol sm={12}>
                                <CCard>
                                    <CCardBody>
                                        <CDataTable
                                            items={data.data}
                                            fields={fields}
                                            columnFilter
                                            tableFilter
                                            footer
                                            itemsPerPageSelect
                                            itemsPerPage={5}
                                            hover
                                            sorter
                                            pagination
                                            scopedSlots={{
                                                'status':
                                                    (item) => (
                                                        <td>
                                                            <CBadge color={getBadge(item.status)}>
                                                                {item.status}
                                                            </CBadge>
                                                        </td>
                                                    ),
                                                'detail':
                                                    (item, index) => {
                                                        return (
                                                            <td className="py-2">
                                                                <CButton
                                                                    color="success"
                                                                    className="mr-1"
                                                                    onClick={() => history.push(`/schedules/${ item._id }`)}>
                                                                    Detail
                                                                </CButton>
                                                            </td>
                                                        )
                                                    },
                                                'edit':
                                                    (item, index) => {
                                                        return (
                                                            <td className="py-2">
                                                                <Modal
                                                                    type="Update"
                                                                    title="Schedule update"
                                                                    body={`Update this schedule ${ item._id }`}
                                                                    size="lg"
                                                                    color="primary"
                                                                />
                                                            </td>
                                                        )
                                                    },
                                                'delete':
                                                    (item, index) => {
                                                        return (
                                                            <td className="py-2">
                                                                <Modal
                                                                    type="Delete"
                                                                    title="Room delete"
                                                                    body={`Do you want delete this schedule ${ item._id }?`}
                                                                    size="sm"
                                                                    color="danger"
                                                                />
                                                            </td>
                                                        )
                                                    },
                                            }}
                                        />

                                    </CCardBody>
                                </CCard>
                            </CCol>
                        </CRow>
                    )}
        </>
    )
}

export default React.memo(Schedules) 
