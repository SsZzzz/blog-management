export default{
    data(){
        return {
            dialogAddFormVisible:false,
            dialogEditFormVisible:false
        }
    },
    methods: {
        clearForm(formName){
			this.$refs[formName].resetFields();
        },
        submitForm(formName,callback) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
                    callback();
                    if(formName==='addForm')
                        this.dialogAddFormVisible=false;
                    else if(formName==='editForm')
                        this.dialogEditFormVisible=false;
				} else {
					return false;
				}
			});
        }
    }
}