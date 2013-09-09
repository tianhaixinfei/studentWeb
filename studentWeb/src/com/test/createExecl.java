package com.test;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;

public class createExecl {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		
		try {
			HSSFWorkbook wb = new HSSFWorkbook();
			HSSFSheet sheet = wb.createSheet("sheet1");
			File f = new File("d:/write12.xls");
			wb.write(new FileOutputStream(f));
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		
	}

}
