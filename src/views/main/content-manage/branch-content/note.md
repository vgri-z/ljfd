### 分厂编辑

- 按钮权限：危险源的添加与更新 危险源草稿的添加

### 编辑逻辑：

- 无 id：

  1. 有 DangerSource.ManageOrganization 权限：直接调取危险源的添加
  2. 无 DangerSource.ManageOrganization 权限：调取危险源草稿的添加

- 有 id：

  1. 有 DangerSource.ManageOrganization 权限：直接调取危险源的更新
  2. 无 DangerSource.ManageOrganization 权限：调取危险源草稿的添加

### 内容审核：

- 按钮权限：危险源草稿的添加
