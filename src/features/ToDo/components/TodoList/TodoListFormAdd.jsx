import "./TodoListFormAdd.scss";

import * as yup from "yup";

import {useDispatch, useSelector} from "react-redux";

import {Formik} from "formik";
import React from "react";
import {todoAdd} from "features/ToDo/todoSlice";

TodoListFormAdd.propTypes = {};

const schema = yup.object().shape({
	name: yup.string().required("Bạn chưa nhập tên công việc"),
});
function TodoListFormAdd({todoId}) {
	const dispatch = useDispatch();

	const groupId = useSelector(state => state.groups.selectedGroup._id);
	const initialValues = {
		name: "",
	};

	const handleSubmit = async (values, {resetForm}) => {
		if (!todoId) return;
		try {
			resetForm();
			await dispatch(todoAdd({todoName: values.name, groupId, todoId}));
			// if (response.payload.success) resetForm();
		} catch (err) {
			console.log(err);
		}
	};
	return (
		<Formik
			initialValues={initialValues}
			validationSchema={schema}
			onSubmit={handleSubmit}
		>
			{formikProps => {
				const {handleSubmit, handleChange, handleBlur, values} = formikProps;
				return (
					<form onSubmit={handleSubmit} className="todo-list__form-add">
						<input
							type="text"
							name="name"
							placeholder="Nhập tên công việc"
							value={values.name}
							onChange={handleChange}
							onBlur={handleBlur}
						/>
						<button type="submit">Thêm</button>
					</form>
				);
			}}
		</Formik>
	);
}

export default TodoListFormAdd;
