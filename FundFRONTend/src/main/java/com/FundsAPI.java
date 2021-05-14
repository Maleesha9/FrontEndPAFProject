package com;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/FundsAPI")
public class FundsAPI extends HttpServlet {
	Fund fundObj = new Fund();

	public FundsAPI() {
		super();

	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		// response.getWriter().append("Served at: ").append(request.getContextPath());

	}
	
	
	/*  protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		String output = fundObj.insertFund(request.getParameter("itemCode"), request.getParameter("itemName"),
				request.getParameter("itemPrice"), request.getParameter("itemDesc"));
		response.getWriter().write(output);
	}*/
  

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		String output = fundObj.insertFund(request.getParameter("ResearcherId"), request.getParameter("ResearcherName"),
				request.getParameter("fundDate"), request.getParameter("fundAmount"), request.getParameter("fundDesc"));
		response.getWriter().write(output);
	}
	
	
	
	

	/**
	 * @see HttpServlet#doPut(HttpServletRequest, HttpServletResponse)
	 */
	protected void doPut(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		Map paras = getParasMap(request);
		String output = fundObj.updateFund(paras.get("hidFundIDSave").toString(), paras.get("ResearcherId").toString(),
				paras.get("ResearcherName").toString(), paras.get("fundDate").toString(),
				paras.get("fundAmount").toString(), paras.get("fundDesc").toString());
		response.getWriter().write(output);
	}

	/**
	 * @see HttpServlet#doDelete(HttpServletRequest, HttpServletResponse)
	 */
	protected void doDelete(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		Map paras = getParasMap(request);
		String output = fundObj.deleteFund(paras.get("fundID").toString());
		response.getWriter().write(output);
	}

	private static Map getParasMap(HttpServletRequest request) {
		Map<String, String> map = new HashMap<String, String>();
		try {
			Scanner scanner = new Scanner(request.getInputStream(), "UTF-8");
			String queryString = scanner.hasNext() ? scanner.useDelimiter("\\A").next() : "";
			scanner.close();
			String[] params = queryString.split("&");
			for (String param : params) {
				String[] p = param.split("=");
				map.put(p[0], p[1]);
			}
		} catch (Exception e) {
		}
		return map;

	}

}
