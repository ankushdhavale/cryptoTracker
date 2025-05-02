import * as React from "react";
import Pagination from "@mui/material/Pagination";
import { useState } from "react";
import "./styles.css";
export default function PaginationComponents({page,handlePageChange}) {
	// const [page, setPage] = useState(1);
	// const handlePageChange = (event, value) => {
	// 	setPage(value);
	// };

	return (
		<div className='pagination-components'>
			<Pagination
				count={10}
				page={page}
				onChange={(event,value)=>handlePageChange(event,value)}
				sx={{
					color: "var(--white)",
					"& .Mui-selected ": {
						backgroundColor: "var(--blue) !important",
						color: "#fff important",
						borderColor: "(--blue) !important",
					},
					"& .MuiPaginationItem-ellipsis": {
						border: "0px solid var(--grey) !important",
					},
					"& .MuiPaginationItem-text": {
						color: "var(--white)",
						border: "1px solid var(--grey)",
					},
				}}
			/>
		</div>
	);
}
