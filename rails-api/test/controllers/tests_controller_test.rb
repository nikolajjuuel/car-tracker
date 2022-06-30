require "test_helper"

class TestsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @test = tests(:one)
  end

  test "should get index" do
    get tests_url, as: :json
    assert_response :success
  end

  test "should create test" do
    assert_difference("Test.count") do
      post tests_url, params: { test: {  } }, as: :json
    end

    assert_response :created
  end

  test "should show test" do
    get test_url(@test), as: :json
    assert_response :success
  end

  test "should update test" do
    patch test_url(@test), params: { test: {  } }, as: :json
    assert_response :success
  end

  test "should destroy test" do
    assert_difference("Test.count", -1) do
      delete test_url(@test), as: :json
    end

    assert_response :no_content
  end
end
