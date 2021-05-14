<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1" import="com.Fund"%>
<%@page import="com.Fund"%>


<!DOCTYPE html>
<html>
<head>

<link rel="stylesheet" href="Views/bootstrap.min.css">
<script src="Components/jquery-3.2.1.min.js"></script>
<script src="Components/funds.js"></script>
<meta charset="ISO-8859-1">
<title>Insert title here</title>
</head>
<body>


	<div class="container">
		<div class="row">
			<div class="col-6">
				<h1>Funds Management</h1>
				<form id="formFund" name="formFund">

					Researcher Id: <input id="ResearcherId" name="ResearcherId"
						type="text" class="form-control form-control-sm"> <br>
					Researcher Name: <input id="ResearcherName" name="ResearcherName"
						type="text" class="form-control form-control-sm"> <br>
					Fund Date: <input id="fundDate" name="fundDate" type="text"
						class="form-control form-control-sm"> <br> Fund
					Amount: <input id="fundAmount" name="fundAmount" type="text"
						class="form-control form-control-sm"> <br> Fund
					Description: <input id="fundDesc" name="fundDesc" type="text"
						class="form-control form-control-sm"> <br> <input
						id="btnSave" name="btnSave" type="button" value="Save"
						class="btn btn-primary"> <input type="hidden"
						id="hidFundIDSave" name="hidFundIDSave" value="">

				</form>
				<div id="alertSuccess" class="alert alert-success"></div>
				<div id="alertError" class="alert alert-danger"></div>
				<br>
				<div id="divFundGrid">
					<%
					Fund fundObj = new Fund();
					out.print(fundObj.readFunds());
					%>
				</div>
			</div>
		</div>
	</div>


</body>
</html>