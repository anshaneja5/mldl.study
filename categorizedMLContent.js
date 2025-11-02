import { } from "framer-motion/client";

const categorizedVideos = {
  "Introduction to Machine Learning": [
    {
      title: "What is Machine Learning? | 100 Days of Machine Learning",
      url: "https://youtube.com/watch?v=ZftI2fEz0Fw"
    },

    {
      title: "AI Vs ML Vs DL for Beginners in Hindi",
      url: "https://youtube.com/watch?v=1v3_AQ26jZ0"
    },
    {
      title: "Types of Machine Learning for Beginners | Types of Machine learning in Hindi | Types of ML in Depth",
      url: "https://youtube.com/watch?v=81ymPYEtFOw"
    },
    {
      title: "Batch Machine Learning | Offline Vs Online Learning | Machine Learning Types",
      url: "https://youtube.com/watch?v=nPrhFxEuTYU"
    },
    {
      title: "Online Machine Learning | Online Learning | Online Vs Offline Machine Learning",
      url: "https://youtube.com/watch?v=3oOipgCbLIk"
    },
    {
      title: "Instance-Based Vs Model-Based Learning | Types of Machine Learning",
      url: "https://youtube.com/watch?v=ntAOq1ioTKo"
    },
    {
      title: "Challenges in Machine Learning | Problems in Machine Learning",
      url: "https://youtube.com/watch?v=WGUNAJki2S4"
    },
    {
      title: "Application of Machine Learning | Real Life Machine Learning Applications",
      url: "https://youtube.com/watch?v=UZio8TcTMrI"
    },
    {
      title: "Machine Learning Development Life Cycle | MLDLC in Data Science",
      url: "https://youtube.com/watch?v=iDbhQGz_rEo"
    },
    {
      title: "Data Engineer Vs Data Analyst Vs Data Scientist Vs ML Engineer | Data Science Job Roles",
      url: "https://youtube.com/watch?v=93rKZs0MkgU"
    },
    {
      title: "What are Tensors | Tensor In-depth Explanation | Tensor in Machine Learning",
      url: "https://youtube.com/watch?v=vVhD2EyS41Y"
    },
    {
      title: "Installing Anaconda For Data Science | Jupyter Notebook for Machine Learning | Google Colab for ML",
      url: "https://youtube.com/watch?v=82P5N2m41jE"
    },
    {
      title: "End to End Toy Project | Day 13 | 100 Days of Machine Learning",
      url: "https://youtube.com/watch?v=dr7z7a_8lQw"
    },
    {
      title: "How to Frame a Machine Learning Problem | How to plan a Data Science Project Effectively",
      url: "https://youtube.com/watch?v=A9SezQlvakw"
    },
    {
      title: "Complete Machine Learning Course for Beginners",
      url: "https://www.youtube.com/watch?v=1L420xXpDTg"
    },
    {
      title: "Machine Learning Crash Course by Google",
      url: "https://developers.google.com/machine-learning/crash-course",
    },
    {
      title: "What is Machine Learning? | Simplilearn",
      url: "https://www.youtube.com/watch?v=ukzFI9rgwfU",
    }
  ],
  "Data Preprocessing": [
    {
      title: "Working with CSV files | Day 15 | 100 Days of Machine Learning",
      url: "https://youtube.com/watch?v=a_XrmKlaGTs"
    },
    {
      title: "Working with JSON/SQL | Day 16 | 100 Days of Machine Learning",
      url: "https://youtube.com/watch?v=fFwRC-fapIU"
    },
    {
      title: "Fetching Data From an API | Day 17 | 100 Days of Machine Learning",
      url: "https://youtube.com/watch?v=roTZJaxjnJc"
    },
    {
      title: "Fetching data using Web Scraping | Day 18 | 100 Days of Machine Learning",
      url: "https://youtube.com/watch?v=8NOdgjC1988"
    },
    {
      title: "Understanding Your Data | Day 19 | 100 Days of Machine Learning",
      url: "https://youtube.com/watch?v=mJlRTUuVr04"
    },
    {
      title: "EDA using Univariate Analysis | Day 20 | 100 Days of Machine Learning",
      url: "https://youtube.com/watch?v=4HyTlbHUKSw"
    },
    {
      title: "EDA using Bivariate and Multivariate Analysis | Day 21 | 100 Days of Machine Learning",
      url: "https://youtube.com/watch?v=6D3VtEfCw7w"
    },
    {
      title: "Pandas Profiling | Day 22 | 100 Days of Machine Learning",
      url: "https://youtube.com/watch?v=E69Lg2ZgOxg"
    },
    {
      title: "Column Transformer in Machine Learning | How to use ColumnTransformer in Sklearn",
      url: "https://youtube.com/watch?v=5TVj6iEBR4I"
    },
    {
      title: "Encoding Categorical Data | Ordinal Encoding | Label Encoding",
      url: "https://youtube.com/watch?v=w2GglmYHfmM"
    },
    {
      title: "One Hot Encoding | Handling Categorical Data | Day 27 | 100 Days of Machine Learning",
      url: "https://youtube.com/watch?v=U5oCv3JKWKA"
    },
    {
      title: "Machine Learning Pipelines A-Z | Day 29 | 100 Days of Machine Learning",
      url: "https://youtube.com/watch?v=xOccYkgRV4Q"
    },
    {
      title: "Function Transformer | Log Transform | Reciprocal Transform | Square Root Transform",
      url: "https://youtube.com/watch?v=cTjj3LE8E90"
    },
    {
      title: "Power Transformer | Box - Cox Transform | Yeo - Johnson Transform",
      url: "https://youtube.com/watch?v=lV_Z4HbNAx0"
    },
    {
      title: "Binning and Binarization | Discretization | Quantile Binning | KMeans Binning",
      url: "https://youtube.com/watch?v=kKWsJGKcMvo"
    },
    {
      title: "Handling Mixed Variables | Feature Engineering",
      url: "https://youtube.com/watch?v=9xiX-I5_LQY"
    },
    {
      title: "Handling Date and Time Variables | Day 34 | 100 Days of Machine Learning",
      url: "https://youtube.com/watch?v=J73mvgG9fFs"
    },
    {
      title: "Handling Missing Data | Part 1 | Complete Case Analysis",
      url: "https://youtube.com/watch?v=aUnNWZorGmk",
      articleLink: "https://www.theanalysisfactor.com/missing-data-mechanism/",
      articleTitle: "Missing Data Mechanism",
      notes: "NOTE: This article is a great resource to understand the different mechanisms of missing data."
    },
    {
      title: "Handling missing data | Numerical Data | Simple Imputer",
      url: "https://youtube.com/watch?v=mCL2xLBDw8M",
      articleLink: "https://medium.com/analytics-vidhya/different-types-of-missing-data-59c87c046bf7",
      articleTitle: "Different Types of Missing Data",
      // notes: "NOTE: This article is a great resource to understand the different types of missing data."
    },
    {
      title: "Handling Missing Categorical Data | Simple Imputer | Most Frequent Imputation | Missing Category Imp",
      url: "https://youtube.com/watch?v=l_Wip8bEDFQ"
    },
    {
      title: "Missing Indicator | Random Sample Imputation | Handling Missing Data Part 4",
      url: "https://youtube.com/watch?v=Ratcir3p03w"
    },
    {
      title: "KNN Imputer | Multivariate Imputation | Handling Missing Data Part 5",
      url: "https://youtube.com/watch?v=-fK-xEev2I8"
    },
    {
      title: "Multivariate Imputation by Chained Equations for Missing Value | MICE Algorithm | Iterative Imputer",
      url: "https://youtube.com/watch?v=a38ehxv3kyk"
    },
    {
      title:"Best Practices Data Preprocessing in Machine Learning Projects",
      articleLink:"https://lakefs.io/blog/data-preprocessing-in-machine-learning/",
      articleTitle:"Best Practices Data Preprocessing in Machine Learning: Steps & Best Practices"
    },
    {
      title:"What is Data Preprocessing & Data Cleaning?",
      url:"https://www.youtube.com/watch?v=tDu_KIlXaB0"
    },
    {
      title:"Data Formatting and Data Binning | Pandas",
      url:"https://www.youtube.com/watch?v=m-Eb7HH_7Kc&list=PLhCoH0dN4ABfsTZlcogIuozaW28HrMWHU&index=5"
    }

  ],
  "Regression Techniques": [
    {
      title: "Simple Linear Regression | Code + Intuition | Simplest Explanation in Hindi",
      url: "https://youtube.com/watch?v=UZPfbG0jNec"
    },
    {
      title: "Simple Linear Regression | Mathematical Formulation | Coding from Scratch",
      url: "https://youtube.com/watch?v=dXHIDLPKdmA"
    },
    {
      title: "VISUALIZATION",
      url: "https://www.geogebra.org/m/rJj6yr6C",
      notes: "NOTE: This is a great visualization to understand the concept of Linear Regression."
    },
    {
      title: "VISUALIZATION",
      url: "https://setosa.io/ev/ordinary-least-squares-regression/"
    },
    {
      title: "Regression Metrics | MSE, MAE & RMSE | R2 Score & Adjusted R2 Score",
      url: "https://youtube.com/watch?v=Ti7c-Hz7GSM"
    },
    {
      title: "Multiple Linear Regression | Geometric Intuition & Code",
      url: "https://youtube.com/watch?v=ashGekqstl8"
    },
    {
      title: "Multiple Linear Regression | Part 2 | Mathematical Formulation From Scratch",
      url: "https://youtube.com/watch?v=NU37mF5q8VE"
    },
    {
      title: "Multiple Linear Regression | Part 3 | Code From Scratch",
      url: "https://youtube.com/watch?v=VmZWXzxmNrE"
    },
    {
      title: "Gradient Descent From Scratch | End to End Gradient Descent | Gradient Descent Animation",
      url: "https://youtube.com/watch?v=ORyfPJypKuU"
    },
    {
      title: "Batch Gradient Descent with Code Demo | Simple Explanation in Hindi",
      url: "https://youtube.com/watch?v=Jyo53pAyVAM"
    },
    {
      title: "Stochastic Gradient Descent",
      url: "https://youtube.com/watch?v=V7KBAa_gh4c"
    },
    {
      title: "Mini-Batch Gradient Descent",
      url: "https://youtube.com/watch?v=_scscQ4HVTY"
    },
    {
      title: "Polynomial Regression | Machine Learning",
      url: "https://youtube.com/watch?v=BNWLf3cKdbQ"
    },
    {
      title: "Bias Variance Trade-off | Overfitting and Underfitting in Machine Learning",
      url: "https://youtube.com/watch?v=74DU02Fyrhk"
    },
    {
      title: "Ridge Regression Part 1 | Geometric Intuition and Code | Regularized Linear Models",
      url: "https://youtube.com/watch?v=aEow1QoTLo0"
    },
    {
      title: "Ridge Regression Part 2 | Mathematical Formulation & Code from scratch | Regularized Linear Models",
      url: "https://youtube.com/watch?v=oDlZBQjk_3A"
    },
    {
      title: "Ridge Regression Part 3 | Gradient Descent | Regularized Linear Models",
      url: "https://youtube.com/watch?v=Fci_wwMp8G8"
    },
    {
      title: "5 Key Points - Ridge Regression | Part 4 | Regularized Linear Models",
      url: "https://youtube.com/watch?v=8osKeShYVRQ"
    },
    {
      title: "Lasso Regression | Intuition and Code Sample | Regularized Linear Models",
      url: "https://youtube.com/watch?v=HLF4bFbBgwk"
    },
    {
      title: "Why Lasso Regression creates sparsity?",
      url: "https://youtube.com/watch?v=FN4aZPIAfI4"
    },
    {
      title: "ElasticNet Regression | Intuition and Code Example | Regularized Linear Models",
      url: "https://youtube.com/watch?v=2g2DBkFhTTY"
    },
    {
      title: "KAGGLE COMPETITON",
      url: "https://www.kaggle.com/competitions/house-prices-advanced-regression-techniques",
      notes: "NOTE: This is a great Kaggle competition where you can apply your knowledge of regression algos. You can also attempt this after learning ensembling techniques."
    },
    {
      title:"Types of Regression Techniques in Machine Learning",
      articleLink:"https://www.geeksforgeeks.org/machine-learning/types-of-regression-techniques/",
      articleTitle:"Types of Regression Techniques in ML"
    },{
      title:"Implementing Decision Tree Regression using Scikit-Learn",
      articleLink:"https://www.geeksforgeeks.org/machine-learning/python-decision-tree-regression-using-sklearn/",
      articleTitle:"Implementing Decision Tree Regression using Scikit-Learn"
    }
  ],
  "Classification Techniques": [
    {
      title:"What is classification in machine learning?",
      articleLink:"https://www.ibm.com/think/topics/classification-machine-learning",
      articleTitle:"What is classification in machine learning?"
    },
    {
      title:"Classification in Machine Learning: An Introduction",
      articleLink:"https://www.datacamp.com/blog/classification-machine-learning",
      articleTitle:"Classification in Machine Learning: An Introduction"
    },
    {
      title: "Logistic Regression Part 1 | Perceptron Trick",
      url: "https://youtube.com/watch?v=XNXzVfItWGY"
    },
    {
      title: "Logistic Regression Part 2 | Perceptron Trick Code",
      url: "https://youtube.com/watch?v=tLezwPKvPK4"
    },
    {
      title: "Logistic Regression Part 3 | Sigmoid Function | 100 Days of ML",
      url: "https://youtube.com/watch?v=ehO0-6i9qD4"
    },
    {
      title: "Logistic Regression Part 4 | Loss Function | Maximum Likelihood | Binary Cross Entropy",
      url: "https://youtube.com/watch?v=6bXOo0sxY5c",
      articleLink: "https://towardsdatascience.com/understanding-binary-cross-entropy-log-loss-a-visual-explanation-a3ac6025181a",
      articleTitle: "Understanding Binary Cross Entropy (Log Loss): A Visual Explanation",
      notes: "NOTE: This article is a great resource to understand the concept of Binary Cross Entropy."
    },
    {
      title: "Derivative of Sigmoid Function",
      url: "https://youtube.com/watch?v=awjXaFR1jOM"
    },
    {
      title: "Logistic Regression Part 5 | Gradient Descent & Code From Scratch",
      url: "https://youtube.com/watch?v=ABrrSwMYWSg"
    },
    {
      title:"Binary Classification | LogisticRegression | Sigmoid | Step function | Complete Project",
      url:"https://www.youtube.com/watch?v=ASP69fBpteg"
    },
    {
      title: "Accuracy and Confusion Matrix | Type 1 and Type 2 Errors | Classification Metrics Part 1",
      url: "https://youtube.com/watch?v=c09drtuCS3c"
    },
    {
      title: "Precision, Recall and F1 Score | Classification Metrics Part 2",
      url: "https://youtube.com/watch?v=iK-kdhJ-7yI"
    },
    {
      title: "Softmax Regression || Multinomial Logistic Regression || Logistic Regression Part 6",
      url: "https://youtube.com/watch?v=Z8noL_0M4tw",
      articleLink: "https://archive.ph/Mzneg",
      articleTitle: "Softmax Regression Article"
    },
    {
      title: "Polynomial Features in Logistic Regression | Non Linear Logistic Regression | Logistic Regression 7",
      url: "https://youtube.com/watch?v=WnBYW_DX3sM"
    },
    {
      title: "Logistic Regression Hyperparameters || Logistic Regression Part 8",
      url: "https://youtube.com/watch?v=ay_OcblJasE"
    },
    {
      title: "Decision Trees Geometric Intuition | Entropy | Gini impurity | Information Gain",
      url: "https://youtube.com/watch?v=IZnno-dKgVQ"
    },
    {
      title: "Decision Trees - Hyperparameters | Overfitting and Underfitting in Decision Trees",
      url: "https://youtube.com/watch?v=mDEV0Iucwz0"
    },
    {
      title: "Regression Trees | Decision Trees Part 3",
      url: "https://youtube.com/watch?v=RANHxyAvtM4",
      articleLink: "https://archive.ph/6yJsG",
      articleTitle: "Regression Trees Article"
    },
    {
      title: "Awesome Decision Tree Visualization using dtreeviz library",
      url: "https://youtube.com/watch?v=SlMZqfvl5uw"
    },
    {
      title: "KAGGLE COMPETITION",
      url: "https://www.kaggle.com/competitions/titanic",
      notes: "NOTE: This is a great Kaggle competition where you can apply your knowledge of classification techniques. You can come here again after learning more algos."
    }
  ],
  "Clustering Algorithms": [
    {
      title:"Clustering in Machine Learning Explained | Top Clustering Methods You MUST Know!",
      url:"https://www.youtube.com/watch?v=c8yiJq1do38"
    },
    {
      title: "K-Means Clustering Algorithm | Geometric Intuition | Clustering | Unsupervised Learning",
      url: "https://youtube.com/watch?v=5shTLzwAdEc"
    },
    {
      title: "VISUALIZATION",
      url: "https://www.naftaliharris.com/blog/visualizing-k-means-clustering/",
      notes: "NOTE: This is a great visualization to understand the concept of K-Means Clustering."
    },
    {
      title: "K-Means Clustering Algorithm in Python | Practical Example | Student Clustering Example | sklearn",
      url: "https://youtube.com/watch?v=UPvv9SprgVo"
    },
    {
      title: "K-Means Clustering Algorithm From Scratch In Python | ML Algorithms From Scratch",
      url: "https://youtube.com/watch?v=MFraC1JObUo"
    },
    {
      title: "Agglomerative Hierarchical Clustering | Python Code Example",
      url: "https://youtube.com/watch?v=Ka5i9TVUT-E",
      articleLink: "https://medium.com/@sachinsoni600517/mastering-hierarchical-clustering-from-basic-to-advanced-5e770260bf93",
      articleTitle: "Mastering Hierarchical Clustering from Basic to Advanced",
    },
    {
      title: "DBSCAN Clustering Algorithms | Density Based Clustering | How DBSCAN Works | CampusX",
      url: "https://youtube.com/watch?v=1_bLnsNmhCI"
    },
    {
      title: "VISUALIZATION",
      url: "https://www.naftaliharris.com/blog/visualizing-dbscan-clustering/",
      notes: "NOTE: This is a great visualization to understand the concept of DBSCAN Clustering."
    },
    {
      title: "Support Vector Machines | Geometric Intuition",
      url: "https://youtube.com/watch?v=ugTxMLjLS8M",
      articleLink: "https://medium.com/analytics-vidhya/understanding-loss-functions-hinge-loss-a0ff112b40a1",
      articleTitle: "Understanding Loss Functions: Hinge Loss"
    },
    {
      title: "VISUALIZATION",
      url: "https://cs.stanford.edu/people/karpathy/svmjs/demo/",
      notes: "NOTE: This is a great visualization by Andrej Karpathy to understand the concept of SVM."
    },
    {
      title: "Interactive SVM Demo",
      url: "https://greitemann.dev/svm-demo",
      notes: "NOTE: This is a great interactive demo to understand the concept of SVM."
    },
    {
      title: "Mathematics of SVM | Support Vector Machines | Hard margin SVM",
      url: "https://youtube.com/watch?v=yCAlHPDgWtM"
    },
    {
      title: "Mathematics of Support Vector Machine | Soft Margin SVM",
      url: "https://youtube.com/watch?v=utqrvIFAE1k",
      articleLink: "https://towardsdatascience.com/support-vector-machines-dual-formulation-quadratic-programming-sequential-minimal-optimization-57f4387ce4dd#d326",
      articleTitle: "Support Vector Machines: Dual Formulation, Quadratic Programming, Sequential Minimal Optimization",
      notes: "NOTE: This article is a great resource to understand the mathematics behind SVM."
    },
    {
      title: "Kernel Trick in SVM | Code Example",
      url: "https://youtube.com/watch?v=pjvmVMDrzVU",
      articleLink: "https://www.quora.com/What-are-kernels-in-machine-learning-and-SVM-and-why-do-we-need-them/answer/Lili-Jiang?srid=oOgT",
      articleTitle: "What are kernels in machine learning and SVM and why do we need them?"
    },
    {
      title: "Kernel Trick in SVM | Geometric Intuition",
      url: "https://youtube.com/watch?v=egxjT0p7_K8",
      articleLink: "https://prateekvjoshi.com/2012/09/01/kernel-functions-for-machine-learning/",
      articleTitle: "Kernel Functions for Machine Learning"
    },
    {
      title: "VISUALIZATION",
      url: "https://www.youtube.com/watch?v=3liCbRZPrZA",
      notes: "NOTE: This is a great yt video to visualize the concept of kernel trick in SVM."
    },
    {
      title: "What is K Nearest Neighbors? | KNN Explained in Hindi | Simple Overview in 1 Video | CampusX",
      url: "https://youtube.com/watch?v=abnL_GUGub4"
    },
    {
      title: "VISUALIZATION",
      url: "http://vision.stanford.edu/teaching/cs231n-demos/knn/",
      notes: "NOTE: This is a great visualization by Stanford to understand the concept of KNN."
    },
    {
      title:"Clustering in Machine Learning",
      articleLink:"https://www.geeksforgeeks.org/machine-learning/clustering-in-machine-learning/",
      articleTitle:"Clustering in Machine Learning"
    }
  ],
  "Dimensionality Reduction": [
    {
      title: "Curse of Dimensionality",
      url: "https://youtube.com/watch?v=ToGuhynu-No",
      articleLink: "https://builtin.com/data-science/curse-dimensionality",
      articleTitle: "The Curse of Dimensionality in Machine Learning",
      notes: "NOTE: This article is a great resource to understand the concept of the Curse of Dimensionality."
    },
    {
      title: "Principle Component Analysis  (PCA) | Part 1 | Geometric Intuition",
      url: "https://youtube.com/watch?v=iRbsBi5W0-c"
    },
    {
      title: "Principle Component Analysis (PCA) | Part 2 | Problem Formulation and Step by Step Solution",
      url: "https://youtube.com/watch?v=tXXnxjj2wM4",
      articleLink: "https://www.visiondummy.com/2014/04/geometric-interpretation-covariance-matrix/#:~:text=covariance%20matrix%20captures%20the%20spread%20of%20N%2Ddimensional%20data.&text=Figure%203.,is%20captured%20by%20the%20variance",
      articleTitle: "Geometric Interpretation of Covariance Matrix",
      notes: "NOTE: Please refer to this article to understand the geometric interpretation of the covariance matrix. Its a little advanced but will help you understand the concept better."
    },
    {
      title: "Principle Component Analysis(PCA) | Part 3 | Code Example and Visualization",
      url: "https://youtube.com/watch?v=tofVCUDrg4M"
    },
    {
      title: "VISUALIZATION",
      url: "https://setosa.io/ev/principal-component-analysis/",
      notes: "NOTE: This is a great visualization to understand the concept of PCA."
    },
    {
      title: "VISUALIZATION",
      url: "https://dimensionality-reduction-293e465c2a3443e8941b016d.vercel.app/",
      notes: "NOTE: This is a great visualization to understand the concept of Dimensionality Reduction and PCA."
    }
  ],
  "Model Evaluation & Tuning": [
    {
      title: "Hyperparameter Tuning Random Forest using GridSearchCV and RandomizedSearchCV | Code Example",
      url: "https://youtube.com/watch?v=4Im0CT43QxY"
    },
    {
      title: "OOB Score | Out of Bag Evaluation in Random Forest | Machine Learning",
      url: "https://youtube.com/watch?v=tdDhyFoSG94",
      articleLink: "https://www.geeksforgeeks.org/oob-errors-for-random-forests-in-scikit-learn/",
      articleTitle: "OOB Errors for Random Forests in Scikit-learn",
      // notes: "NOTE: This article is a great resource to understand the concept of OOB errors in Random Forests."
    },
    {
      title: "Feature Importance using Random Forest and Decision Trees | How is Feature Importance calculated",
      url: "https://youtube.com/watch?v=R47JAob1xBY"
    },
  ],
  "Feature Selection & Engineering": [
    {
      title: "Feature Construction | Feature Splitting",
      url: "https://youtube.com/watch?v=ma-h30PoFms"
    },
    {
      title: "What is Feature Engineering | Day 23 | 100 Days of Machine Learning",
      url: "https://youtube.com/watch?v=sluoVhT0ehg",
      articleLink: "https://www.kaggle.com/code/prashant111/a-reference-guide-to-feature-engineering-methods",
      articleTitle: "A Reference Guide to Feature Engineering Methods",
      notes: "NOTE: This is a kaggle notebook which is a great resource to understand the different feature engineering methods."
    },
    {
      articleLink: "https://www.analyticsvidhya.com/blog/2021/09/complete-guide-to-feature-engineering-zero-to-hero/",
      articleTitle: "Complete Guide to Feature Engineering: Zero to Hero",
    },
    {
      title: "Feature Scaling - Standardization | Day 24 | 100 Days of Machine Learning",
      url: "https://youtube.com/watch?v=1Yw9sC0PNwY"
    },
    {
      title: "Feature Scaling - Normalization | MinMaxScaling | MaxAbsScaling | RobustScaling",
      url: "https://youtube.com/watch?v=eBrGyuA2MIg"
    },

  ],
  "Ensemble Learning": [
    {
      title:"What is ensemble learning?",
      articleLink:"https://www.ibm.com/think/topics/ensemble-learning",
      articleTitle:"What is ensemble learning?"
    },
    {
      title: "Introduction to Ensemble Learning | Ensemble Techniques in Machine Learning",
      url: "https://youtube.com/watch?v=bHK1fE_BUms"
    },
    {
      title: "Voting Ensemble |  Introduction and Core Idea | Part 1",
      url: "https://youtube.com/watch?v=_W1i-c_6rOk"
    },
    {
      title: "Voting Ensemble | Classification | Voting Classifier | Hard Voting Vs Soft Voting | Part 2",
      url: "https://youtube.com/watch?v=pGQnNYdPTvY"
    },
    {
      title: "Voting Ensemble | Regression | Part 3",
      url: "https://youtube.com/watch?v=ut4vh59rGkw"
    },
    {
      title: "Bagging | Introduction | Part 1",
      url: "https://youtube.com/watch?v=LUiBOAy7x6Y"
    },
    {
      title: "Bagging Ensemble | Part 2 | Bagging Classifiers",
      url: "https://youtube.com/watch?v=-1T54G_E-ys"
    },
    {
      title: "Bagging Ensemble | Part 3 | Bagging Regressor",
      url: "https://youtube.com/watch?v=HYVzrETXbkE"
    },
    {
      title: "Introduction to Random Forest | Intuition behind the Algorithm",
      url: "https://youtube.com/watch?v=F9uESCHGjhA"
    },
    {
      title: "VISUALIZATION",
      url: "https://cs.stanford.edu/~karpathy/svmjs/demo/demoforest.html",
      notes: "NOTE: This is a great visualization by Andrej Karpathy to understand the concept of Random Forest."
    },
    {
      title: "How Random Forest Performs So Well? Bias Variance Trade-Off in Random Forest",
      url: "https://youtube.com/watch?v=jHgG4gjuFAk"
    },
    {
      title: "Bagging Vs Random Forest | What is the difference between Bagging and Random Forest | Very Important",
      url: "https://youtube.com/watch?v=l93jRojZMqU"
    },
    {
      title: "Random Forest Hyper-parameters",
      url: "https://youtube.com/watch?v=WOFVY_wQ9wU"
    },
    {
      title: "AdaBoost - A Step by Step Explanation",
      url: "https://youtube.com/watch?v=RT0t9a3Xnfw"
    },
    {
      title: "AdaBoost Algorithm | Code from Scratch",
      url: "https://youtube.com/watch?v=a20TaKNsriE"
    },
    {
      title: "AdaBoost Hyperparameters | GridSearchCV in Adaboost",
      url: "https://youtube.com/watch?v=JmXnztjULnQ",
      articleLink: "https://stats.stackexchange.com/questions/82323/shrinkage-parameter-in-adaboost",
      articleTitle: "Shrinkage Parameter in AdaBoost",
    },
    {
      title: "Bagging Vs Boosting | What is the difference between Bagging and Boosting",
      url: "https://youtube.com/watch?v=7M5oWXCpDEw"
    },
    {
      title: "Gradient Boosting Explained | How Gradient Boosting Works?",
      url: "https://youtube.com/watch?v=fbKz7N92mhQ"
    },
    {
      title: "Gradient Boosting Regression Part 2 | Mathematics of Gradient Boosting",
      url: "https://youtube.com/watch?v=nMNiTZm-qY0"
    },
    {
      title: "Gradient Boosting for Classification | Geometric Intuition | CampusX",
      url: "https://youtube.com/watch?v=4p5EQtyxSyI",
      articleLink: "https://towardsdatascience.com/all-you-need-to-know-about-gradient-boosting-algorithm-part-2-classification-d3ed8f56541e"
    },
    {
      title: "Stacking and Blending Ensembles",
      url: "https://youtube.com/watch?v=O-aDHBGMqXA"
    },
    {
      title: "Gradient Boosting Explained | How Gradient Boosting Works?",
      url: "https://youtube.com/watch?v=fbKz7N92mhQ"
    },
    {
      title: "Gradient Boosting Regression Part 2 | Mathematics of Gradient Boosting",
      url: "https://youtube.com/watch?v=nMNiTZm-qY0",
      articleLink: "https://towardsdatascience.com/all-you-need-to-know-about-gradient-boosting-algorithm-part-1-regression-2520a34a502",
      articleTitle: "All you need to know about Gradient Boosting Algorithm"
    },
    {
      title: "Gradient Boosting for Classification | Geometric Intuition | CampusX",
      url: "https://youtube.com/watch?v=4p5EQtyxSyI"
    },
    {
      title: "Introduction to XGBOOST | Machine Learning | CampusX",
      url: "https://youtube.com/watch?v=C6aDw4y8qJ0",
      articleLink: "https://archive.ph/hpJV0",
      articleTitle: "XGBoost: A Scalable Tree Boosting System (RESEARCH PAPER)"
    },
    {
      title: "XGBoost for Regression | XGBoost Part 2 | CampusX",
      url: "https://youtube.com/watch?v=gmp2tS2joaA"
    },
    {
      title: "XGBoost For Classification | How XGBoost works on Classification Problems | CampusX",
      url: "https://youtube.com/watch?v=mELtxVUNNrw"
    },
    {
      title: "The Maths Behind XGBoost | Machine Learning | CampusX",
      url: "https://youtube.com/watch?v=0Eo-_5bfers"
    },
    {
      title:"Time Series Forecasting with XGBoost",
      url:"https://www.youtube.com/watch?v=vV12dGe_Fho"
    },
    {
      title: "KAGGLE COMPETITON",
      url: "https://www.kaggle.com/competitions/house-prices-advanced-regression-techniques",
      notes: "NOTE: This is a great Kaggle competition where you can apply your knowledge of ensemble learning."
    }
  ],
};

export default categorizedVideos;