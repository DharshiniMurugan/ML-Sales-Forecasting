#include<stdio.h>
#include<string.h>
int main()
{
char re[20];
int q[20][3],i,j,len,a,b;
for(a=0;a<20;a++)
{
for(b=0;b<3;b++)
{
q[a][b]=0;
}
}
printf("Enter the Regular expression:\n");
scanf("%s",re);
len=strlen(re);
i=0;j=1;
while(i<len)
{
if(re[i]=='a'&&re[i+1]!='/'&&re[i+1]!='*')
{
q[j][0]=j+1;j++;
}
if(re[i]=='b'&&re[i+1]!='/'&&re[i+1]!='*')
{
q[j][1]=j+1;j++;
}

if(re[i]=='e'&&re[i+1]!='/'&&re[i+1]!='*')
{
q[j][2]=j+1;j++;
}
if(re[i]=='a'&& re[i+1]=='/'&&re[i+2]=='b')
{
q[j][2]=((j+1)*10)+(j+3);j++;
q[j][0]=j+1;j++;
q[j][2]=j+3;j++;
q[j][2]=j+1;j++;i=i+2;
}
if(re[i]=='b'&&re[i+1]=='/'&&re[i+2]=='a')
{
q[j][2]=((j+1)*10)+(j+3);j++;
q[j][1]=j+1;j++;
q[j][2]=j+3;j++;
q[j][0]=j+1;j++;
q[j][2]=j+1;j++;
i=i+2;
}
if(re[i]=='a'&&re[i+1]=='*')
{
q[j][2]=((j+1)*10)+(j+3);
j++;
q[j][0]=j+1;
j++;
q[j][2]=((j+1)*10)+(j-1);
j++;
}
if(re[i]=='b'&&re[i+1]=='*')
{
q[j][2]=((j+1)*10)+(j+3);
j++;
q[i][j]=j+1;
j++;
q[j][2]=((j+1)*10)+(j-1);
j++;
}
if(re[i]==')'&&re[i+1]=='*')
{
q[0][2]=((j+1)*10)+1;
q[j][2]=((j+1)*10)+1;
j++;
}
i++;
}
printf("Transition function:\n");
for(i=0;i<=j;i++)
{
if(q[i][0]!=0)
printf("\n q[%d,a]-->%d",i,q[i][0]);
if(q[i][1]!=0)
printf("\n q[%d,b]-->%d",i,q[i][1]);
if(q[i][2]!=0)
{
if(q[i][2]<10)
printf("\n q[%d,e]-->%d",i,q[i][2]);
else
printf("\n q[%d,e]-->%d & %d",i,q[i][2]/10,q[i][2]%10);
}
}
}
