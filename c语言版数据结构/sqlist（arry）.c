#include <stdio.h>
#include <stdlib.h>

#define INIT_CAPACITY 10
typedef struct {
	int *data;
	int Length;
	int capacity;
} sqlist;
void initlist(sqlist *L) {
	L->data=(int*)malloc(sizeof(int)*INIT_CAPACITY);
	L->Length=0;
	L->capacity=INIT_CAPACITY;
}
void ex_list(sqlist *L) {
	int new_capacity=2*L->capacity;
	int*newdata=(int*)realloc(L->data,new_capacity*sizeof(int));
	if(newdata==NULL) {
		printf("申请失败，内存不足");
		exit(1);
	}
	L->capacity=new_capacity;
	L->data=newdata;
}
void insertTail(sqlist *L,int elem) {
	if(L->capacity<=L->Length) {
		ex_list(L);
	}
	L->data[L->Length]=elem;
	L->Length++;
}
void insertAT(sqlist*L,int order,int elem) {
	if(L->capacity<=L->Length+1) {
		ex_list(L);
	}
	for(int i=L->Length-1; i>=order-1; i--) {
		L->data[i+1]=L->data[i];
	}
	L->data[order-1]=elem;
	L->Length++;
}
void delelem(sqlist *L,int order) {
	if(L->Length<=0) {
		printf("无数据可删除");
		exit(1);
	}
	for(int i=order-1; i<L->Length-1; i++) {
		L->data[i]=L->data[i+1];
	}
	L->Length--;
}
void printList(sqlist *L) {
	for(int i=0; i<L->Length; i++) {
		printf("第%d号是%d\n",i+1,L->data[i]);
	}
}
int main(){
    sqlist L; 
    int num=0;
    initlist(&L);
    for(int i=0;i<L.capacity-1;i++){
        printf("请输入元素，若想结束请输入“-1”。");
        scanf("%d",&num);
        if(num!=-1){
            insertTail(&L,num);
        }
        else{
            break;
        }
    }
    printList(&L);
    insertAT(&L,5,21);
    printList(&L);
    delelem(&L,5);
    printList(&L);
return 0;
}













