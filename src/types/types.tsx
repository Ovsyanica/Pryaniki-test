export interface IContract {
	id: string;
	companySigDate: string;
	companySignatureName: string;
	documentName: string;
	documentStatus: string;
	documentType: string;
	employeeNumber: string;
	employeeSigDate: string;
	employeeSignatureName: string;
}

export interface IAuthData {
	data: { token: string };
	error_code: number;
	error_text: string;
}

export interface IGetData {
	data: IContract[];
	error_code: number;
	error_message: string;
}

export interface IPostData {
	data: IContract;
	error_code: number;
	error_message: string;
}

export interface IUpdateData {
	data: IContract;
	error_code: number;
	error_message: string;
}

export interface IRemoveData {
	error_code: number;
	error_message: string;
}