var Task = function() {
	this.name = "";
	this.hours = 0;
	this.employee = null;
	this.status = 0;
	this.completed = false;
	
	this.resolved = function() {
		that.completed = true;
	};
	
	this.reopened = function() {
		that.completed = false;
	};
	
	this.isResolved = function() {
		return that.completed;
	};
	
	this.assigned = function() {
		that.status = 1;
	};
	
	this.unassigned = function() {
		that.status = 0;
	};
	
	this.isOpen = function() {
		return that.status == 0;
	};
	var that = this;
}