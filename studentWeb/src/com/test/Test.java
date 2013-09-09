package com.test;

public class Test {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		String s = "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24";
		String st="";
		int sl = s.split(",").length;
		if(10 < sl){
			for(int i = 0; i < (sl/2)+2;i++){
				st +=(st=="")?s.split(",")[i]:","+s.split(",")[i];
			}
			st +="\n";
			for(int i = (sl/2)+2; i < sl;i++){
				st +=","+s.split(",")[i];
			}
			System.out.println(st);
		}else{
			st = s;
			System.out.println(st);
		}
			
		
			
	}

}
