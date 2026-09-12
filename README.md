# OMSCS Learning Notes

OMSCS 课程的中文逐页学习笔记，按课程、课件和 PDF 页码组织。

**公开页面：** [OMSCS Learning Notes](https://zhima1999.github.io/omscs-lesson/)

## 当前内容

| 课程 | 课件 | 整理状态 |
| --- | --- | --- |
| Deep Learning | Lesson 1: Linear Classifiers and Gradient Descent | 入口已建立，逐页笔记待整理 |
| Deep Learning | Lesson 2: Neural Networks and Backpropagation | 52 页完整笔记 |
| Deep Learning | Lesson 3: Optimization of Deep Networks | 84 页完整笔记，每页含对应课件截图 |
| Human-Computer Interaction | HCI | 课程占位入口，暂不收录讲义 |

每页包含课件原意的简要转述、通俗讲解、相关公式和核心知识点。站点支持页码定位、中文和英文搜索、前后翻页及手机阅读。

本仓库是个人自学笔记，不是 Georgia Tech 官方课程网站。原始教材和课件 PDF 不随站点发布；Lesson 3 每页提供对应的课件截图，供学习笔记对照，课件版权归原作者所有。

第 3 课第 55–60 页的补充说明对照了以下原始研究与官方资料：

- [Adaptive Gradient Methods with Dynamic Bound of Learning Rate](https://arxiv.org/abs/1902.09843)：课件引用的优化器表现研究，不应把特定实验结果当作普遍排名。
- [Decoupled Weight Decay Regularization](https://arxiv.org/abs/1711.05101)：普通 SGD 中 L2 与权重衰减的联系，以及自适应优化器中的区别。
- [Dropout 原始论文](https://jmlr.org/papers/v15/srivastava14a.html)与 [PyTorch Dropout 文档](https://docs.pytorch.org/docs/stable/generated/torch.nn.Dropout.html)：随机屏蔽、共同适应、保留概率和丢弃概率，以及训练与推理的尺度处理。

后续逐页笔记的补充对照资料：

- [CutMix 原始论文](https://arxiv.org/abs/1905.04899)：双图区域替换及面积加权标签，不等同于普通单图裁剪。
- [Milking CowMask for Semi-Supervised Image Classification](https://arxiv.org/abs/2003.12022)：CowMask、CowMix 与半监督预测一致性；教师／学生细节明确标为论文补充。
- [PyTorch 异常检测文档](https://docs.pytorch.org/docs/stable/autograd.html#torch.autograd.detect_anomaly)：反向传播 NaN 诊断及前向调用线索，不能当作所有数据问题的自动修复工具。
- [Random Search for Hyper-Parameter Optimization](https://jmlr.org/papers/v13/bergstra12a.html)：重要超参数与搜索预算的关系，随机搜索不是无条件优于网格的保证。
- [ROC 官方示例](https://scikit-learn.org/stable/auto_examples/model_selection/plot_roc.html)与 [Precision–Recall 官方示例](https://scikit-learn.org/stable/auto_examples/model_selection/plot_precision_recall.html)：澄清第 82–83 页的曲线名称混淆，以及精确率、召回率和阈值关系。
- [Average Precision 文档](https://scikit-learn.org/stable/modules/generated/sklearn.metrics.average_precision_score.html)：平均精确率与 PR 折线梯形面积并不完全相同。
- [Leslie N. Smith 的超参数论文](https://arxiv.org/abs/1803.09820)：第 84 页列出的原始参考资源。

## 本地预览

需要 Node.js 20 或更新版本运行检查，Python 3 启动静态预览。站点本身没有安装依赖或构建步骤。

```sh
npm test
npm run serve
```

预览地址为 `http://localhost:4173/`。

## 内容文件

- `data/courses.js`：课程及课件目录。
- `data/deep-learning-lesson-2.js`：第 2 课逐页笔记。
- `data/deep-learning-lesson-3.js`：第 3 课 84 页笔记及对应截图索引。
- `data/lesson-3/`：第 3 课后续笔记，按每批 3 页发布。
- `assets/slides/lesson-3/`：第 3 课 84 页对应截图。
- `js/app.js`：课程页和阅读页。
- `styles.css`：桌面与手机样式。

推送到 `main` 后，GitHub Actions 先检查内容，再发布到 GitHub Pages。发布产物只包含 HTML、样式、脚本、笔记数据、课件截图和图标库，不包含本地测试或设计文档。

图标来自 Lucide，许可见 `vendor/LUCIDE-LICENSE`。
