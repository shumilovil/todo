import React, { useEffect, useState } from 'react';
import { Modal, Input, DatePicker, DatePickerProps, message } from 'antd';
import type { RangePickerProps } from 'antd/es/date-picker';
import { addTask, fetchTasks, Task, updateTask } from '../../redux/modules/tasks/slice';
import moment from 'moment';
import { useAppDispatch } from '../../redux/root';
import './TaskModal.scss';

const { TextArea } = Input;

type Props = {
  taskToEdit?: Task | null;
  isModalOpen: boolean;
  onOk: () => void;
  onCancel: () => void;
};

const TaskModal = ({ taskToEdit, isModalOpen, onOk, onCancel }: Props) => {
  const dispatch = useAppDispatch();

  const [datePickerValue, setDatePickerValue] = useState<moment.Moment | null>(null);
  const [titleValue, setTitleValue] = useState<string>('');
  const [descriptionValue, setDescriptionValue] = useState<string>('');

  const isEditMode = !!taskToEdit;

  const { id, title, date, description } = taskToEdit || {};

  const resetForm = () => {
    setDatePickerValue(null);
    setTitleValue('');
    setDescriptionValue('');
  };

  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    return current && current < moment().startOf('day');
  };

  // initial modal values
  useEffect(() => {
    if (isEditMode) {
      setDatePickerValue(moment(date));
      setTitleValue(title!);
      setDescriptionValue(description!);
    } else {
      setDatePickerValue(moment());
    }
  }, [isModalOpen, taskToEdit]);

  const handleDateSelect: DatePickerProps['onChange'] = (date) => {
    setDatePickerValue(moment(date));
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitleValue(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescriptionValue(e.target.value);
  };

  const handleSuccess = (successMessage: string) => {
    message.success(successMessage);
    resetForm();
    dispatch(fetchTasks());
  };

  const handleSave = () => {
    onOk();
    if (isEditMode) {
      dispatch(
        updateTask({
          id: id!,
          date: datePickerValue?.toDate()!,
          title: titleValue,
          description: descriptionValue,
        })
      )
        .unwrap()
        .then(() => handleSuccess('Updated successfully'))
        .catch(() => message.error('Something went wrong...'));
    } else {
      dispatch(
        addTask({
          date: datePickerValue?.toDate()!,
          title: titleValue,
          description: descriptionValue,
        })
      )
        .unwrap()
        .then(() => handleSuccess('Added successfully'))
        .catch(() => message.error('Something went wrong...'));
    }
  };

  return (
    <Modal
      visible={isModalOpen}
      title={isEditMode ? `Edit '${title}' task` : 'Add a new task'}
      okText="Save"
      onOk={handleSave}
      onCancel={onCancel}
      destroyOnClose={true}
    >
      <div className="input-block">
        <h3>Due date</h3>
        <DatePicker
          onChange={handleDateSelect}
          value={datePickerValue}
          allowClear={false}
          disabledDate={disabledDate}
        />
      </div>
      <div className="input-block">
        <h3>Title</h3>
        <Input placeholder="title" value={titleValue} onChange={handleTitleChange} />
      </div>
      <div className="input-block">
        <h3>Description</h3>
        <TextArea
          rows={4}
          placeholder="Description"
          value={descriptionValue}
          onChange={handleDescriptionChange}
        />
      </div>
    </Modal>
  );
};

export default React.memo(TaskModal);
