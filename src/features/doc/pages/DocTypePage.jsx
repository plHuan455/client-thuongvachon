import "./docIntro.scss";

import {useDispatch, useSelector} from "react-redux";

import DocForm from "../components/DocForm";
import {IoAddCircleOutline} from "react-icons/io5";
import MyButton from "components/MyButton/MyButton";
import React from "react";
import Table from "components/Table/Table";
import {docDeleteDoc} from "../docSlice";
import {useState} from "react";

// import PropTypes from "prop-types";

// DocIntro.propTypes = {
// };

// DocIntro.defaultProps = {
// };

function DocIntro(props) {
	const docTypeInfo = useSelector(state => state.docs.types);

	const dispatch = useDispatch();

	// useState
	const [isShowForm, setIsShowForm] = useState(false);

	// Handle Functions
	const handleDelete = async typeId => {
		// console.log(`[typeId]`, typeId);
		try {
			const response = await dispatch(docDeleteDoc(typeId));
			console.log(`[response]`, response);
		} catch (err) {
			console.log(`[doc delete]`, err);
		}
		return true;
	};

	return (
		<div className="doc-intro">
			{isShowForm ? (
				<DocForm
					isDataLoading={docTypeInfo.loading}
					handleCancel={() => {
						setIsShowForm(false);
					}}
				/>
			) : (
				<>
					<h2 className="doc-intro__title">
						Danh sách các tài liệu
						<IoAddCircleOutline
							onClick={() => {
								setIsShowForm(true);
							}}
							style={{cursor: "pointer"}}
						/>
					</h2>
					<Table headerList={["Stt", "Tên tài liệu", "Option"]}>
						{docTypeInfo.loading ? (
							<tr>
								<td colSpan="3" style={{textAlign: "center"}}>
									Loading...
								</td>
							</tr>
						) : docTypeInfo.data.length === 0 ? (
							"Tài liệu trống"
						) : (
							docTypeInfo.data.map((value, index) => (
								<tr
									key={index}
									style={{
										backgroundColor:
											index % 2 !== 0
												? "rgba(163, 23, 81, 0.218)"
												: "transparent",
									}}
								>
									<td>{index}</td>
									<td>{value.type}</td>
									<td
										className="doc-intro__table__btn"
										onClick={() => {
											handleDelete(value._id);
										}}
									>
										<MyButton type="a" text="Delete" onClick={handleDelete} />
									</td>
								</tr>
							))
						)}
					</Table>
				</>
			)}
		</div>
	);
}

export default DocIntro;