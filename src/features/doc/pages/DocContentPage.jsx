import "./docIntro.scss";
import "./docContentPage.scss";

import {useDispatch, useSelector} from "react-redux";
import {useLocation, useParams} from "react-router";

import DocContentPageIntro from "./DocContentPageIntro";
import DocRightBar from "../components/DocRightBar";
import React from "react";
import {docGetContent} from "../docSlice";
import {useEffect} from "react";
import {useState} from "react";

// import DocCompileContent from "../components/DocCompileContent";

// import DocForm from "../components/DocForm";

// import PropTypes from 'prop-types';

// DocContentPage.propTypes = {

// };

const useQuery = () => {
	return new URLSearchParams(useLocation().search);
};

function DocContentPage(props) {
	// useDispatch
	const dispatch = useDispatch();

	// Queries
	const query = useQuery();
	const title = query.get("title"); // default: null

	// Params is _id of docType {id: String}
	const params = useParams();
	const currType = useSelector(state =>
		state.docs.types.data.find(value => value._id === params.id)
	);

	// useSelector
	const currContent = useSelector(state => {
		return state.docs.contents.find(value => value.typeId === params.id);
	});

	// useState
	const [isLoading, setIsLoading] = useState(
		currContent === undefined ? true : false
	);

	useEffect(() => {
		const typeId = params.id;
		if (!typeId) return;
		if (currContent !== undefined) return;

		setIsLoading(true);

		const fetchContent = async () => {
			try {
				await dispatch(docGetContent({data: typeId}));
				setIsLoading(false);
			} catch (err) {
				console.log(`[fetch doc content ERROR]`, err);
			}
		};
		fetchContent();
	}, [params.id, currContent, dispatch]);

	return (
		<div className="doc-content-page">
			<div className="doc-content-page__rightbar">
				<div className="doc-content-page__rightbar__item">
					<DocRightBar
						isLoading={isLoading}
						titles={
							currContent !== undefined
								? currContent.data.map(value => {
										return {_id: value._id, title: value.title};
								  })
								: []
						}
					/>
				</div>
			</div>

			<div className="doc-content-page__content">
				{title === null && (
					<DocContentPageIntro
						type={currType}
						dataInfo={currContent}
						isLoading={isLoading}
					/>
				)}
			</div>
		</div>
	);
}

export default DocContentPage;
