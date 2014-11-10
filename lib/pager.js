var Immutable = require('immutable');

function buildPageIndex(totalRecords, pageSize) {
    var totalPages = Math.round(
        totalRecords / pageSize
    );
    if (totalRecords % pageSize) {
        totalPages = totalPages + 1;
    }
    var startIndex = 0;
    var endIndex = startIndex + pageSize - 1;
    var pageIndex = {};
    for (var i = 0; i < totalPages; i ++) {
        pageIndex[i] = [startIndex, endIndex];
        startIndex = endIndex + 1;
        endIndex = endIndex + pageSize;
        if (endIndex > totalRecords) {
            endIndex = totalRecords - 1;
        }
    }
    return pageIndex;
}

/**
 * @fileoverview A module to handle paging of array data.
 * @author biosidd@gmail.com (Siddhartha Basu)
 */

/**
 * @constructor
 * @param {args} Arguments for the pager.
 * @param args.data The array data that will be paged.
 * @param args.pageSize Number of rows per page.
 */
function DataPager(args) {
    if (!args['data'] || !args['pageSize']) {
        throw '*data* or *pageSize argument is not given';
    }
    this._dataList = args['data'];
    this._pageSize = args['pageSize'];
    this._totalRecords = args['data'].length;
    this._pageIndex = buildPageIndex(this._totalRecords,this._pageSize);
}

/**
 * Given a page number returns the start and end index of the page in the array.
 * @param {number} The page number.
 * @return {List} An immutable list with two elements.
 *         For immutable object look <a href="http://facebook.github.io/immutable-js/">here</a>
 */
DataPager.prototype.getDataIndex = function(pageNum) {
    var idx = pageNum - 1;
    if (!this._pageIndex[idx]) {
        var msg = 'page ' + pageNum + ' does not exist';
        throw msg;
    }
    return Immutable.List(this._pageIndex[idx]);
};

/**
 * Given a page number returns a slice of array
 * @param {number} The page number.
 * @return {List} An immutable list from the slice of data array equal to page size.
 *         For immutable object look <a href="http://facebook.github.io/immutable-js/">here</a>
 */
DataPager.prototype.getDataByPage = function(pageNum) {
    var idx = this.getDataIndex(pageNum);
    if (idx.get(0) == idx.get(1)) {
        return Immutable.List(this._dataList[idx.get(0)]);
    }
    return Immutable.List(this._dataList.slice(idx.get(0), idx.get(1) + 1));
};

module.exports = DataPager;
