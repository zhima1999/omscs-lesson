export const courses = [
  {
    id: "deep-learning",
    code: "CS 7643",
    title: "Deep Learning",
    titleZh: "深度学习",
    description: "从线性分类器、反向传播到深度网络优化，按 PPT 页码整理的中文学习笔记。",
    accent: "green",
    icon: "brain-circuit",
    lessons: [
      {
        id: "1",
        number: 1,
        title: "Linear Classifiers and Gradient Descent",
        titleZh: "线性分类器与梯度下降",
        source: "M1L1 Linear Classifiers and Gradient Descent - Slides v2.pdf",
        totalPages: 92,
        taughtPages: 0,
        status: "not-started"
      },
      {
        id: "2",
        number: 2,
        title: "Neural Networks and Backpropagation",
        titleZh: "神经网络与反向传播",
        source: "slides 1.pdf",
        totalPages: 52,
        taughtPages: 52,
        status: "complete"
      },
      {
        id: "3",
        number: 3,
        title: "Optimization of Deep Networks",
        titleZh: "深度网络的优化",
        source: "M1L3 Optimization of Deep Networks - Slides v4.pdf",
        totalPages: 84,
        taughtPages: 78,
        status: "in-progress"
      }
    ]
  },
  {
    id: "hci",
    code: "CS 6750",
    title: "Human-Computer Interaction",
    titleZh: "人机交互",
    description: "课程入口已经建立，讲义将在 Deep Learning 整理完成后加入。",
    accent: "coral",
    icon: "mouse-pointer-2",
    lessons: []
  }
];

export function getCourse(courseId) {
  return courses.find((course) => course.id === courseId);
}
