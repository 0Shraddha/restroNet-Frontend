import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
	useReactTable,
	getCoreRowModel,
	getPaginationRowModel,
	flexRender,
} from "@tanstack/react-table";
import { pluralizeWord } from "../../lib/utils";
// import Sort from "../sort";
// import Categories from "../categories";
// import Filter from "../filter";
// import Search from "../searchcontent";

const DataTable = ({
	addLink,
	tableFor,
	columns,
	data,
	isLoading,
	searchFor,
	categoryType,
	filterData,
	sortData,
}) => {
  
	const [pagination, setPagination] = useState({
		pageIndex: 0,
		pageSize: 15,
	});

	const table = useReactTable({
		data,
		columns: columns,
		state: { pagination },
		onPaginationChange: setPagination,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		manualPagination: false,
		pageCount: Math.ceil(data.length / pagination.pageSize),
	});


	return (
		<div>
			<div className="flex justify-between">
				<h1 className="capitalize text-[20px] font-medium">
					{pluralizeWord(tableFor)}
				</h1>

				 
			</div>
			<div className="flex gap-2 mb-4">
			
			</div>
			<div className=" border-1 border-gray-200 rounded-t-md">
				<table className="min-w-full divide-y rounded-md divide-gray-200 overflow-hidden ">
					<thead className="font-['nunito'] ">
						{table.getHeaderGroups().map((headerGroup) => (
							<tr key={headerGroup.id}>
								{headerGroup.headers.map((header, index) => (
									<th
										key={index}
										className="px-4 py-2 text-left text-sm font-bold bg-[#2A2A2A] text-[#FFFFFF]"
									>
										{flexRender(
											header.column.columnDef.header,
											header.getContext()
										)}
									</th>
								))}
							</tr>
						))}
					</thead>
					<tbody className="divide-y divide-gray-200 datatable-body">
						{table.getRowModel().rows.map((row) => (
							<tr key={row.id} className="hover:bg-gray-50 even:bg-gray-100">
								{row.getVisibleCells().map((cell, index) => (
									<td key={index} className="px-4 py-2 text-sm text-gray-700">
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default DataTable;
