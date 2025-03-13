import { create } from "zustand";
import "./App.css";
import { Button, Drawer, Form, Input, InputNumber, Table } from "antd";
import { useState } from "react";

type StudentsType = {
  id: number;
  activ: boolean;
  age: number;
  firstName: string;
  gender: "male" | "female";
  lastName: string;
};

type GlobalType = {
  students: StudentsType[];
  group?: any[];
  addStudent: (student: StudentsType) => void;
};

function RandomId() {
  return Math.floor(Math.random() * 100000);
}

const useGlobalStore = create<GlobalType>((set) => ({
  students: [
    {
      id: RandomId(),
      activ: true,
      age: 12,
      firstName: "Ali",
      lastName: "aaaa",
      gender: "male",
    },
  ],
  addStudent: (student) =>
    set((state) => ({
      students: [...state.students, student],
    })),
}));

type InputAddProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
};

function InputAdd({ setOpen, open }:InputAddProps) {
  const onClose = () => {
    setOpen(false);
  };

  const addStudent = useGlobalStore((state) => state.addStudent);
  const [form] = Form.useForm();

  return (
    <Drawer title="Add Student" onClose={onClose} open={open}>
      <Form
        form={form}
        onFinish={(values) => {
          addStudent({ ...values, id: RandomId() });
          form.resetFields();
          setOpen(false);
        }}
      >
        <Form.Item label="Ism" name="firstName" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Familya" name="lastName" rules={[{ required: true }]}>
          <Input />
        </Form.Item>{" "}
        <Form.Item label="Yosh" name="age" rules={[{ required: true }]}>
          <InputNumber />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Add Student
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
}

function App() {
  const [open, setOpen] = useState(false);
  const students = useGlobalStore((state) => state.students);

  return (
    <>
      <InputAdd open={open} setOpen={setOpen} />
      <Button type="primary" onClick={() => setOpen(true)}>
        Add Student
      </Button>
      <Table
        columns={[
          { title: "ID", dataIndex: "id" },
          { title: "Ims", dataIndex: "firstName" },
          { title: "Familya", dataIndex: "lastName" },
          { title: "yosh", dataIndex: "age" },
        ]}
        dataSource={students.map((s) => ({ ...s, key: s.id }))}
      />
    </>
  );
}

export default App;
