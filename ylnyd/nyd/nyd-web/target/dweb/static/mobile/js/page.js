var pageInit = function(currentPage, total,rows) {



//	console.log("total:" + total + ",page=" + currentPage);
	var total = total;
	var currentPage = currentPage;
	var rows=rows;
//	console.log("total:" + total + ",page=" + currentPage);
	// {
	// pager.total
	// };

	var dpager = {};
	// $.alert($("#currentPage").val());
	dpager.page = currentPage;// 当前页码
	dpager.total = total;// 当前页码

	dpager.rows = rows;
	dpager.url = window.location.href;

	dpager.init = function(page, rows) {
		dpager.page = page;
		dpager.rows = rows;
		dpager.url = basePath;
	}
	this.lastPage = function() {
		if (dpager.page <= 1) {
			// $("#last-page").addClass("button-disable");
			return;
		} else {
			// $("#last-page").removeClass("button-disable");

		}
		dpager.page--;
		console.log(window.location.href);
		console.log(window.location.search);
		// window.location.search+="&page="+dpager.page;
		var url = window.location.href;
		var params = window.location.search;
		if (params.indexOf("?", 0) != -1) {
			if (params.indexOf("&pageNumber=") != -1) {
				url = url.substring(0, url.indexOf("&pageNumber="))
			}
			url += "&pageNumber=" + dpager.page;
		} else {
			url += "?1232&pageNumber=" + dpager.page;
		}
		console.log(window.location.href);
		// location.replace()
		location.replace(url);
	}
	this.nextPage = function() {
		var pageCount = Math.floor(dpager.total % dpager.rows) == 0 ? Math
				.floor(dpager.total / dpager.rows) : Math.floor(dpager.total
				/ dpager.rows) + 1;
		if (pageCount == 0) {
			pageCount == 1;
		}
		if (dpager.page == pageCount) {
			// $("#next-page").addClass("button-disable");
			console.log("最后一页")
			return;
		} else {
			// $("#next-page").removeClass("button-disable");

		}
		dpager.page++;
//		console.log("pagerCount" + pageCount);
		var url = window.location.href;
		var params = window.location.search;
		if (params.indexOf("?", 0) != -1) {
			if (params.indexOf("&pageNumber=") != -1) {
				url = url.substring(0, url.indexOf("&pageNumber="))
			}
			url += "&pageNumber=" + dpager.page;
		} else {
			url += "?123&pageNumber=" + dpager.page;
		}
		location.replace(url);
	}
	
	$(function() {
		if (dpager.page <= 1) {
			$("#last-page").addClass("button-disable");
		} else {
			$("#last-page").removeClass("button-disable");

		}
		var pageCount = Math.floor(dpager.total % dpager.rows) == 0 ? Math
				.floor(dpager.total / dpager.rows) : Math.floor(dpager.total
				/ dpager.rows) + 1;
		if (pageCount == 0) {
			pageCount == 1;
		}
		if (dpager.page == pageCount) {
			$("#next-page").addClass("button-disable");
			// console.log("最后一页")
		} else {
			$("#next-page").removeClass("button-disable");

		}
	});
	return this;
}