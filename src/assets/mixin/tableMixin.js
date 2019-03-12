export default{
    data(){
        return {
            pagination: {
                page: 1,
                pageSize: 11,
                total: 0
            },
            loading:false
        }
    },
    methods: {
        handleCurrentChange(page,callback){
			this.pagination.page=page;
			callback();
        },
        search(callback){
			this.pagination.page=1;
			callback();
        },
        handleEdit(row) {
            for(let label in this.editForm){
                this.editForm[label]=row[label];
            }
            this.dialogEditFormVisible=true;
        },
        handleDelete(param,callback) {
			this.$confirm('确认删除?', {
				type: 'warning'
			}).then(() => {
				callback(param);
			}).catch(() => {
				this.$message({
					type: 'info',
					message: '已取消删除'
				});
			});
		}
    }
}