/**
 * 
 */

$(document).ready(function() {
	if ($("#alertSuccess").text().trim() == "") {
		$("#alertSuccess").hide();
	}
	$("#alertError").hide();
});

$(document).on("click", "#btnSave", function(event) {
	// Clear alerts---------------------
	$("#alertSuccess").text("");
	$("#alertSuccess").hide();
	$("#alertError").text("");
	$("#alertError").hide();
	// Form validation-------------------
	var status = validateFundForm();
	if (status != true) {
		$("#alertError").text(status);
		$("#alertError").show();
		return;
	}

	// If valid------------------------
	var type = ($("#hidFundIDSave").val() == "") ? "POST" : "PUT";
	$.ajax({
		url : "FundsAPI",
		type : type,
		data : $("#formFund").serialize(),
		dataType : "text",
		complete : function(response, status) {
			onFundSaveComplete(response.responseText, status);
		}
	});
});

function onFundSaveComplete(response, status) {
	if (status == "success") {
		var resultSet = JSON.parse(response);
		if (resultSet.status.trim() == "success") {
			$("#alertSuccess").text("Successfully saved.");
			$("#alertSuccess").show();
			$("#divFundsGrid").html(resultSet.data);
		} else if (resultSet.status.trim() == "error") {
			$("#alertError").text(resultSet.data);
			$("#alertError").show();
		}
	} else if (status == "error") {
		$("#alertError").text("Error while saving.");
		$("#alertError").show();
	} else {
		$("#alertError").text("Unknown error while saving..");
		$("#alertError").show();
	}
	$("#hidFundIDSave").val("");
	$("#formFund")[0].reset();
}

// delete

function onFundDeleteComplete(response, status) {
	if (status == "success") {
		var resultSet = JSON.parse(response);
		if (resultSet.status.trim() == "success") {
			$("#alertSuccess").text("Successfully deleted.");
			$("#alertSuccess").show();
			$("#divFundsGrid").html(resultSet.data);
		} else if (resultSet.status.trim() == "error") {
			$("#alertError").text(resultSet.data);
			$("#alertError").show();
		}
	} else if (status == "error") {
		$("#alertError").text("Error while deleting.");
		$("#alertError").show();
	} else {
		$("#alertError").text("Unknown error while deleting..");
		$("#alertError").show();
	}
}

$(document).on("click", ".btnRemove", function(event) {
	$.ajax({
		url : "FundsAPI",
		type : "DELETE",
		data : "fundID=" + $(this).data("fundid"),
		dataType : "text",
		complete : function(response, status) {
			onFundDeleteComplete(response.responseText, status);
		}
	});
});

// UPDATE==========================================
$(document).on("click", ".btnUpdate", function(event) {
	$("#hidFundIDSave").val($(this).data("fundid"));
	$("#ResearcherId").val($(this).closest("tr").find('td:eq(0)').text());
	$("#ResearcherName").val($(this).closest("tr").find('td:eq(1)').text());
	$("#fundDate").val($(this).closest("tr").find('td:eq(2)').text());
	$("#fundAmount").val($(this).closest("tr").find('td:eq(3)').text());
	$("#fundDesc").val($(this).closest("tr").find('td:eq(4)').text());
});

// CLIENT-MODEL================================================================
function validateFundForm() {
	// CODE
	if ($("#ResearcherId").val().trim() == "") {
		return "Insert Researcher  ID.";
	}
	// NAME
	if ($("#ResearcherName").val().trim() == "") {
		return "Insert Researcher Name.";

	}
	// PRICE-------------------------------
	if ($("#fundDate").val().trim() == "") {
		return "Insert fund Date.";
	}
	// is numerical value
	var tmpPrice = $("#fundAmount").val().trim();
	if (!$.isNumeric(tmpPrice)) {
		return "Insert a numerical value for Fund Price.";
	}
	// convert to decimal price
	$("#fundAmount").val(parseFloat(tmpPrice).toFixed(2));
	
	// DESCRIPTION------------------------
	if ($("#fundDesc").val().trim() == "") {
		return "Insert Fund Description.";
	}
	return true;
}
