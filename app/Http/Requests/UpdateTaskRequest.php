<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTaskRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true; //middlewareで保護する予定なのでここはtrueにしておく
    }

    /**
     * タスク更新時のバリデーション
     */
    public function rules(): array
    {
        return [
            'user_id' => 'nullable',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'due_date' => 'required',
            'status' => 'nullable|in:pending,in_progress,completed',
            'completed_at' => 'nullable|date',
            'deleted_at' => 'nullable|date',
        ];
    }

    /**メッセージを日本語で作成 */
    public function messages()
    {
        return [
            'title.required' => 'タイトルを入力してください',
            'title.string' => '数字のみで作成できません。',
            'title.max' => 'タイトルは255文字以下で入力してください。',
            'description.string' => '内容に数字・記号のみで作成することはできません。',
            'due_date.required' => '期限を設定してください。',
        ];
    }
}
