#include <iostream>
using namespace std;

#define MAX 5

int stack[MAX];
int top = -1;

void push(int value) {
    if (top == MAX - 1) {
        cout << "Stack Overflow" << value << endl;
    } else {
        top++;
        stack[top] = value;
        cout << value << " push" << endl;
    }
}

void pop() {
    if (top == -1) {
        cout << "Stack Underflow" << endl;
    } else {
        cout << stack[top] << " pop" << endl;
        top--;
    }
}

void display() {
    if (top == -1) {
        cout << "Stack is empty." << endl;
    } else {
        for (int i = top; i >= 0; i--) {
            cout << stack[i] << endl;
        }
    }
}

int main() {
    push(10);
    push(20);
    push(30);

    pop();
    display();
    
    return 0;
}
