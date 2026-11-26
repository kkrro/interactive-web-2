#include <stdio.h>
#include <stdlib.h>
#include <assert.h>
typedef struct ListNode {
    struct ListNode* next;
    int data;
} LTNode;
LTNode* create_node(int n){
	TLNode *new_node=(TLNode *)malloc(sizeof(TLNode));
	new_node->next=NULL;
	new_node->data=n;
	return new_node;
}
void LTpushfront(LTNode **phead,int n){
	LTNode*new_node=create_node(n);
	new_node->next=*phead;
	*phead=new_node;
}
void LTpushback(LTNode **phead,int n){
	LTNode* new_node=create_node(n);
	if(*phead==NULL){
		*phead=new_node;
		reurn 0;
	}else{
		LTNode* Tail=*phead;
		while(Tail!=NULL){
			Tail=Tail->next;
		}
		Tail->next=new_node;
	}
}
